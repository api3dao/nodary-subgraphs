## Regenerate types when schema.graphql is changed

```bash
yarn codegen:<CONTRACT-NAME>
```

## Register subgraph for a contract

```bash
# It will create subgraph with the name <CHAIN-NAME>/<CONTRACT-NAME>
NETWORK=<CHAIN-NAME> CONTRACT=<CONTRACT-NAME> NODE=<NODE-ADMIN-ENDPOINT> yarn create:manuel
```

## Remove existing subgraph

```bash
# It will remove subgraph with the name <CHAIN-NAME>/<CONTRACT-NAME>
NETWORK=<CHAIN-NAME> CONTRACT=<CONTRACT-NAME> NODE=<NODE-ADMIN-ENDPOINT> yarn remove:manuel
```

## Deploy subgraph

```bash
# It will deploy subgraph with the name <CHAIN-NAME>/<CONTRACT-NAME>
NETWORK=<CHAIN-NAME> CONTRACT=<CONTRACT-NAME> NODE=<NODE-ADMIN-ENDPOINT> IPFS=<IPFS-ENDPOINT> yarn deploy:manuel
```

## Register and deploy subgraphs for <COMMA-SEPARATED-CONTRACTS> defined for <CHAIN-NAME> in networks.json

```bash
NETWORK=<CHAIN-NAME> CONTRACTS=<COMMA-SEPARATED-CONTRACTS> NODE=<NODE-ADMIN-ENDPOINT> IPFS=<IPFS-ENDPOINT> yarn deploy:auto
```
