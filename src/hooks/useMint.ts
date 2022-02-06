import { useCallback } from 'react';
import { useNetwork } from 'wagmi';
import usePlaygroundsGenesisEngineContract from './usePlaygroundsGenesisEngineContract';
import useExecuteTransaction, { Transaction } from './useExecuteTransaction';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  const playgroundsGenesisEngineContract = usePlaygroundsGenesisEngineContract();
  const [{ data, state, error }, executeTransaction] = useExecuteTransaction();
  const [{ data: network }] = useNetwork();

  const mint = useCallback(
    async (isCodeValid: boolean) =>
      executeTransaction(() =>
        playgroundsGenesisEngineContract.mint(
          // TODO: use mainnet fallback
          MORPHS_NFT_CONTRACT_ADDRESSES[network?.chain?.id ?? 4],
          isCodeValid
        )
      ),
    [network, playgroundsGenesisEngineContract, executeTransaction]
  );

  return [{ data, state, error }, mint] as [Transaction, typeof mint];
};
