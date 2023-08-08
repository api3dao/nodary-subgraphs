export type ContractMeta = { address: string; startBlock?: number } | undefined;
export type Network = Record<string, ContractMeta>;