import { execSync } from 'child_process';
import { readJsonFile, readYamlFile, writeYamlFile } from './utils';
import path from 'path';
import { Networks } from './types';

const main = async () => {
  const preferredChain = process.env.NETWORK;
  const nodeUrl = process.env.NODE;
  const ipfsUrl = process.env.IPFS;

  if (!preferredChain) throw new Error(`Environment variable 'NETWORK' is required to be provided`);
  if (!nodeUrl) throw new Error(`Environment variable 'NODE' is required to be provided`);
  if (!ipfsUrl) throw new Error(`Environment variable 'IPFS' is required to be provided`);

  const networks = readJsonFile(path.join(__dirname, '..', 'networks.json')) as Networks;
  const availableChains = Object.keys(networks);

  if (!availableChains.includes(preferredChain)) throw new Error(`${preferredChain} is not available in networks.json`);

  const availableContracts = Object.keys(networks[preferredChain]);

  for (const contractName of availableContracts) {
    const folderPath = path.join(__dirname, '..', 'subgraphs', contractName);
    // Fetch subgraph.template.yaml for the contract
    const subgraphTemplate = readYamlFile(path.join(folderPath, 'subgraph.template.yaml'));

    subgraphTemplate.dataSources[0].source.address = networks[preferredChain][contractName]!.address;

    if (networks[preferredChain][contractName]?.startBlock)
      subgraphTemplate.dataSources[0].source.startBlock = networks[preferredChain][contractName]!.startBlock;
    else delete subgraphTemplate.dataSources[0].source.startBlock;

    subgraphTemplate.dataSources[0].network = preferredChain;

    await writeYamlFile(path.join(folderPath, 'subgraph.yaml'), subgraphTemplate);

    // Register subgraph with a name <chainName>/<contractName>
    execSync(`npx graph create ${preferredChain}/${contractName} --node ${nodeUrl}`);
    // Deploy registered subgraph
    execSync(
      `npx graph deploy ${preferredChain}/${contractName} ${path.join(
        folderPath,
        'subgraph.yaml'
      )} --ipfs ${ipfsUrl} --node ${nodeUrl} --version-label v0.0.1 --network-file ${path.join(
        __dirname,
        '..',
        'networks.json'
      )}`
    );
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
