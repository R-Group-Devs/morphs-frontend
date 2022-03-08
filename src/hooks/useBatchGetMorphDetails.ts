import { useQuery } from 'react-query';
import useChainId from './useChainId';
import { batchGetMorphDetails } from '../lib/morphs';

export default (tokenIds: string[]) => {
  const chainId = useChainId();
  const rpcUrl = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`;

  return useQuery(
    `${chainId}:${tokenIds}:morph`,
    async () => batchGetMorphDetails(chainId, rpcUrl, tokenIds),
    { enabled: !!tokenIds }
  );
};
