import { useCallback } from 'react';
import useChainId from './useChainId';
import usePlaygroundsEngineContract from './usePlaygroundsEngineContract';
import useExecuteTransaction from './useExecuteTransaction';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  const playgroundsEngineContract = usePlaygroundsEngineContract();
  const [{ data, state, error }, executeTransaction] = useExecuteTransaction();
  const chainId = useChainId();
  const { signer } = playgroundsEngineContract;

  const updateSigil = useCallback(
    async (tokenId: string, sigil: string) => {
      executeTransaction(() =>
        playgroundsEngineContract.updateSigil(
          MORPHS_NFT_CONTRACT_ADDRESSES[chainId],
          tokenId,
          sigil
        )
      );
    },
    [chainId, playgroundsEngineContract, executeTransaction]
  );

  return [{ data, state, error, signer }, updateSigil] as const;
};
