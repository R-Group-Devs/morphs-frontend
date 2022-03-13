import { useQuery } from 'react-query';
import useChainId from './useChainId';
import { getSigilLeaderboard } from '../lib/sigils';

export default () => {
  const chainId = useChainId();

  return useQuery(['alignments', chainId], async () => getSigilLeaderboard(chainId));
};
