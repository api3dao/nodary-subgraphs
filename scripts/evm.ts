import axios from 'axios';
import { CHAINS } from '@api3/chains';
import { AirnodeRrpAddresses } from '@api3/airnode-protocol';
import { references as referencesV1 } from '@api3/airnode-protocol-v1';
import { ContractMeta } from './types';

const getEtherscanLikeAPIUrl = (networkAlias: string): string => {
  const chain = CHAINS.find(({ alias }) => alias === networkAlias);
  if (!chain)
    throw new Error(
      `Chain with the alias ${networkAlias} was not found in @api3/chains while retriving block explorer API URL`
    );

  if (!chain.explorer.api) throw new Error(`Block explorer API was not found for chain with the alias ${networkAlias}`);

  return chain.explorer.api.url;
};

const getPublicRPCEndpoint = (networkAlias: string): string => {
  const chain = CHAINS.find(({ alias }) => alias === networkAlias);
  if (!chain)
    throw new Error(
      `Chain with the alias ${networkAlias} was not found in @api3/chains while retriving public RPC URL`
    );

  return chain.providerUrl;
};

const fetchContractCreationHash = async (network: string, contractAddress: string): Promise<any> => {
  try {
    const scanApiUrl = getEtherscanLikeAPIUrl(network);
    const result = await axios.get(
      `${scanApiUrl}?module=contract&action=getcontractcreation&contractaddresses=${contractAddress}`
    );
    const json = result.data;
    if (json.status !== '1') throw new Error(`'status' attribute expected to be '1', ${json.status} received`);
    return json.result[0].txHash;
  } catch (error) {
    throw new Error(
      `Failed to fetch contract creation transaction hash, ${error}, Parameters: ${JSON.stringify({
        network,
        contractAddress,
      })}`
    );
  }
};

const fetchTransactionByHashFromRPC = async (network: string, transactionHash: string): Promise<any> => {
  try {
    const RPCURL = getPublicRPCEndpoint(network);
    const result = await axios.post(
      RPCURL,
      {
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [transactionHash],
        id: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (result.data.error) throw new Error(JSON.stringify(result.data.error));
    const tx = result.data.result;
    return tx;
  } catch (error) {
    throw new Error(
      `Failed to fetch contract creation transaction, ${error}, Parameters: ${JSON.stringify({
        network,
        transactionHash,
      })}`
    );
  }
};

const getStartBlockForContract = async (network: string, address: string): Promise<number> => {
  try {
    const transactionHash = await fetchContractCreationHash(network, address);
    const tx = await fetchTransactionByHashFromRPC(network, transactionHash);
    return parseInt(tx.blockNumber, 16);
  } catch (error) {
    throw error;
  }
};

const chainAliasToId = Object.fromEntries(
  Object.entries(referencesV1.chainNames).map(([chainId, chainAlias]) => [chainAlias, chainId])
);

const getChainId = (chainAlias: string) => {
  const chainId = chainAliasToId[chainAlias];
  if (!chainId) {
    throw new Error(`Chain with the alias ${chainAlias} not found in @api3/airnode-protocol-v1 references`);
  }
  return chainId;
};

export const prepareAirnodeRrpV0 = async (chainAlias: string): Promise<ContractMeta> => {
  const chainId = getChainId(chainAlias);

  const address = AirnodeRrpAddresses[chainId];
  if (!address) {
    console.log(`AirnodeRrpV0 deployment not found for chain with the id ${chainId}, skipping adding AirnodeRrpV0`);
    return;
  }

  try {
    const startBlock = await getStartBlockForContract(chainAlias, address);
    return { address, startBlock };
  } catch (error) {
    console.log(`Failed to get startBlock for AirnodeRrpV0 on ${chainAlias}, skipping adding startBlock, ${error}`);
    return { address };
  }
};

export const prepareApi3ServerV1 = async (chainAlias: string): Promise<ContractMeta> => {
  const chainId = getChainId(chainAlias);

  const address = referencesV1.Api3ServerV1[chainId];
  if (!address) {
    console.log(`Api3ServerV1 deployment not found for chain with the id ${chainId}, skipping adding Api3ServerV1`);
    return;
  }

  try {
    const startBlock = await getStartBlockForContract(chainAlias, address);
    return { address, startBlock };
  } catch (error) {
    console.log(`Failed to get startBlock for Api3ServerV1 on ${chainAlias}, skipping adding startBlock, ${error}`);
    return { address };
  }
};

export const prepareOrderPayable = async (chainAlias: string): Promise<ContractMeta> => {
  const chainId = getChainId(chainAlias);

  const address = referencesV1.OrderPayable[chainId];
  if (!address) {
    console.log(`OrderPayable deployment not found for chain with the id ${chainId}, skipping adding OrderPayable`);
    return;
  }

  try {
    const startBlock = await getStartBlockForContract(chainAlias, address);
    return { address, startBlock };
  } catch (error) {
    console.log(`Failed to get startBlock for OrderPayable on ${chainAlias}, skipping adding startBlock, ${error}`);
    return { address };
  }
};

export const preparePrepaymentDepository = async (chainAlias: string): Promise<ContractMeta> => {
  const chainId = getChainId(chainAlias);

  const address = referencesV1.PrepaymentDepository[chainId];
  if (!address) {
    console.log(`PrepaymentDepository deployment not found for chain with the id ${chainId}, skipping adding PrepaymentDepository`);
    return;
  }

  try {
    const startBlock = await getStartBlockForContract(chainAlias, address);
    return { address, startBlock };
  } catch (error) {
    console.log(`Failed to get startBlock for PrepaymentDepository on ${chainAlias}, skipping adding startBlock, ${error}`);
    return { address };
  }
};