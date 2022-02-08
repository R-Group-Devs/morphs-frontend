import { useCallback } from 'react';
import { useNetwork } from 'wagmi';
import { Signer } from 'ethers';
import usePlaygroundsGenesisEngineContract from './usePlaygroundsGenesisEngineContract';
import useExecuteTransaction, { Transaction } from './useExecuteTransaction';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';

interface MintTransaction extends Transaction {
  signer: Signer;
}

export default () => {
  const playgroundsGenesisEngineContract = usePlaygroundsGenesisEngineContract();
  const [{ data, state, error }, executeTransaction] = useExecuteTransaction();
  const [{ data: network }] = useNetwork();

  const mint = useCallback(
    async (flag: number) => {
      executeTransaction(() =>
        playgroundsGenesisEngineContract.mint(
          // TODO: use mainnet fallback
          MORPHS_NFT_CONTRACT_ADDRESSES[network?.chain?.id ?? 4],
          flag
        )
      );
    },
    [network, playgroundsGenesisEngineContract, executeTransaction]
  );

  return [{ data, state, error, signer: playgroundsGenesisEngineContract.signer }, mint] as [
    MintTransaction,
    typeof mint
  ];
};
