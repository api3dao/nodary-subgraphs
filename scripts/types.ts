export type ContractMeta = { address: string; startBlock?: number } | undefined;
export type Network = Record<string, ContractMeta>;
export type Networks = Record<string, Network>;
