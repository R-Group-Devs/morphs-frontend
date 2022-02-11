import { useEffect, useMemo } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import { TransactionReceipt } from '@ethersproject/providers';
import {
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalItem,
} from './Modal';
import { WalletProviderDetails, WalletProviderDescription, WalletIcon } from './WalletProvider';
import { transactionStates, Transaction } from '../hooks/useExecuteTransaction';
import {
  PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES,
  MORPHS_NFT_CONTRACT_ADDRESSES,
} from '../constants/contracts';
import { WALLETS } from '../constants/wallets';
import { NFT_EXPLORER_URLS } from '../constants/explorers';

interface Props {
  data: TransactionReceipt | null;
  state: Transaction['state'];
  close: () => void;
}

export default ({ data, state, close }: Props) => {
  const [{ data: wallet }] = useConnect();
  const [{ data: network }] = useNetwork();

  const chainId =
    network?.chain?.id && network?.chain?.id in PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES
      ? network?.chain?.id
      : // TODO: use mainnet fallback
        4;

  const nftId = useMemo(() => {
    if (
      state === transactionStates.CONFIRMED &&
      data?.logs &&
      data.logs[0]?.topics &&
      data.logs[0]?.topics[3]
    ) {
      return parseInt(data.logs[0].topics[3]);
    }

    return null;
  }, [data, state]);

  useEffect(() => {
    if (state === transactionStates.IDLE) {
      close();
    }
  }, [state, close]);

  return (
    <ModalPortal>
      <ModalOverlay>
        <ModalContainer close={close}>
          <ModalTitle close={close}>Mint a Scroll</ModalTitle>

          <ModalContent>
            {state === transactionStates.AWAITING_SIGNATURE && (
              <>
                <ModalItem>Awaiting wallet signature...</ModalItem>

                <ModalItem>
                  <WalletProviderDetails>
                    <div>
                      <div>{wallet.connector?.name}</div>

                      {wallet.connector?.id && (
                        <WalletProviderDescription>
                          {WALLETS[wallet.connector.id].description}
                        </WalletProviderDescription>
                      )}
                    </div>

                    {wallet.connector?.id && <WalletIcon src={WALLETS[wallet.connector.id].icon} />}
                  </WalletProviderDetails>
                </ModalItem>
              </>
            )}

            {state === transactionStates.AWAITING_CONFIRMATION && (
              <>
                <ModalItem>Minting scroll...</ModalItem>

                <ModalItem>
                  This may take up to a few minutes. Feel free to close this window and check back
                  later.
                </ModalItem>
              </>
            )}

            {state === transactionStates.CONFIRMED && (
              <>
                <ModalItem>Scroll minted!</ModalItem>

                <ModalItem>
                  <span>
                    Your scroll has been minted. See it{' '}
                    {nftId ? (
                      <a
                        href={`${NFT_EXPLORER_URLS[chainId]}/token/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}:${nftId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        here
                      </a>
                    ) : (
                      <a
                        href={`${NFT_EXPLORER_URLS[chainId]}/collection/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        here
                      </a>
                    )}
                    .
                  </span>
                </ModalItem>
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </ModalOverlay>
    </ModalPortal>
  );
};
