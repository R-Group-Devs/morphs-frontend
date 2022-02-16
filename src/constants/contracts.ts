import { NETWORKS } from './networks';

export const PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES = {
  [NETWORKS.ethereum]: '0xd23c25eb1bad8b1de60cbd313c09209055fd74c0',
  [NETWORKS.rinkeby]: '0xef817cb5ce513be10ce892fb291ac2dec2c1cb40',
} as const;

export const MORPHS_NFT_CONTRACT_ADDRESSES = {
  [NETWORKS.ethereum]: '0x480894ceedc8ff63b6db624568f666e634dc8623',
  [NETWORKS.rinkeby]: '0x7b586e2ccb67aad5b800dc8f3ed6545ba6bffd7b',
} as const;
