export const NETWORKS: Record<string, number> = {
  mainnet: 1,
  rinkeby: 4,
};

export const PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES: Record<string, string> = {
  [NETWORKS.rinkeby]: '0xBb4058eFA31dc2a2DB5839560E50BA00957E0497',
};

export const MORPHS_NFT_CONTRACT_ADDRESSES: Record<string, string> = {
  [NETWORKS.rinkeby]: '0x9c724d794940d94139fd32eff6606827c6c75fa0',
};
