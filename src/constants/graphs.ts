import { NETWORKS } from './networks';

export const GRAPH_URLS = {
  [NETWORKS.ethereum]: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-mainnet',
  [NETWORKS.rinkeby]: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-rinkeby',
} as const;
