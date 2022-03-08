import { useQuery } from 'react-query';
import useChainId from './useChainId';
import { batchGetMorphDetails } from '../lib/morphs';
import { RPC_URLS } from '../constants/rpc';

export default (tokenIds?: string[]) => {
  const chainId = useChainId();
  const rpcUrl = RPC_URLS[chainId];

  return useQuery(
    `${chainId}:${tokenIds}:morphs`,
    async () => batchGetMorphDetails(chainId, rpcUrl, tokenIds || []),
    { enabled: tokenIds && tokenIds?.length > 0 }
  );
};
