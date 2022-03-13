import { useQuery } from 'react-query';
import useChainId from './useChainId';
import { searchMorphs, MorphsQuery } from '../lib/search';

export default (query: MorphsQuery) => {
  const chainId = useChainId();

  return useQuery(['morphs', chainId, query], async () => searchMorphs(query, chainId));
};
