import { useQuery } from 'react-query';
import useChainId from './useChainId';
import { batchGetMorphDetails } from '../lib/morphs';

export default (tokenIds?: string[]) => {
  const chainId = useChainId();

  return useQuery(
    ['morphs', chainId, tokenIds],
    async () => batchGetMorphDetails(chainId, tokenIds || []),
    { enabled: tokenIds && tokenIds?.length > 0 }
  );
};
