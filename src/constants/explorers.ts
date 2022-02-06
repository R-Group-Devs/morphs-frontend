import { NETWORKS } from './networks';

export const BLOCK_EXPLORER_URLS: Record<string, string> = {
  [NETWORKS.ethereum]: 'https://etherscan.io',
  [NETWORKS.rinkeby]: 'https://rinkeby.etherscan.io',
};
