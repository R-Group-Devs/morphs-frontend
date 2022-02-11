import { useEffect } from 'react';
import { useConnect } from 'wagmi';
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
import { WALLETS } from '../constants/wallets';

interface Props {
  state: Transaction['state'];
  close: () => void;
}

export default ({ state, close }: Props) => {
  const [{ data: wallet }] = useConnect();

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
                  {/* TODO: replace w/ NFT contract address + NFT token ID */}
                  <span>
                    Your scroll has been minted. See it{' '}
                    <a
                      href="https://rarible.com/collection/0x9c724d794940d94139fd32eff6606827c6c75fa0"
                      target="_blank"
                      rel="noreferrer"
                    >
                      here
                    </a>
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
