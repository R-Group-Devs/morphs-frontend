import { useQuery } from 'react-query';
import useChainId from './useChainId';
import { getOwnedMorphs } from '../lib/morphs';
import useBatchGetMorphDetails from './useBatchGetMorphDetails';

export default (address: string) => {
  const chainId = useChainId();

  const { data: tokenIds } = useQuery(
    `${chainId}:${address}:tokenIdsByAddress`,
    async () => getOwnedMorphs(chainId, address),
    { enabled: !!address }
  );

  return useBatchGetMorphDetails(tokenIds);
};
