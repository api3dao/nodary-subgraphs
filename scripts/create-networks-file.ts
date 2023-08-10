import { prepareAirnodeRrpV0, prepareApi3ServerV1, prepareOrderPayable, preparePrepaymentDepository } from './evm';
import { Network } from './types';
import { sleep, writeJsonFile } from './utils';

const mainnetAliasesToInclude = [
  'arbitrum',
  'avalanche',
  'bsc',
  'fantom',
  'gnosis',
  'ethereum',
  'moonbeam',
  'moonriver',
  'optimism',
  'polygon',
  'polygon-zkevm',
];

const testnetAliasesToInclude = [
  'arbitrum-goerli-testnet',
  'avalanche-testnet',
  'bsc-testnet',
  'fantom-testnet',
  'gnosis-testnet',
  'ethereum-goerli-testnet',
  'ethereum-sepolia-testnet',
  'moonbeam-testnet',
  'optimism-goerli-testnet',
  'polygon-testnet',
  'polygon-zkevm-goerli-testnet',
];

let chainAliasesToInclude: string[];
if (['--only-mainnets', '--only-testnets'].includes(process.argv[2])) {
  switch (process.argv[2]) {
    case '--only-mainnets':
      chainAliasesToInclude = mainnetAliasesToInclude.sort((a, b) => a.localeCompare(b));
      break;
    case '--only-testnets':
      chainAliasesToInclude = testnetAliasesToInclude.sort((a, b) => a.localeCompare(b));
      break;
  }
}
// If no argument matches or not provided all chains will be included
else
  chainAliasesToInclude = [...mainnetAliasesToInclude, ...testnetAliasesToInclude].sort((a, b) => a.localeCompare(b));

const main = async () => {
  const networkPromises = chainAliasesToInclude.map(async (chainAlias): Promise<[string, Network]> => {
    const AirnodeRrpV0 = await prepareAirnodeRrpV0(chainAlias);
    const Api3ServerV1 = prepareApi3ServerV1(chainAlias);
    const OrderPayable = prepareOrderPayable(chainAlias);
    const PrepaymentDepository = preparePrepaymentDepository(chainAlias);

    return [
      chainAlias,
      {
        AirnodeRrpV0,
        Api3ServerV1,
        OrderPayable,
        PrepaymentDepository,
      },
    ];
  });

  const networksAsEntries = await Promise.all(networkPromises);
  const networks = Object.fromEntries(networksAsEntries);

  await writeJsonFile('networks.json', networks);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
