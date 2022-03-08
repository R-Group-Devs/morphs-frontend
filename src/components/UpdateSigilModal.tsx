import { useEffect } from 'react';
import { useConnect } from 'wagmi';
import { TransactionReceipt } from '@ethersproject/providers';
import {
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalItem,
} from './Modal';
import Paragraph from './Paragraph';
import HelperText from './HelperText';
import LoadingText from './LoadingText';
import { transactionStates, Transaction } from '../hooks/useExecuteTransaction';

interface Props {
  data: TransactionReceipt | null;
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
          <ModalTitle close={close}>Align Sigil</ModalTitle>

          <ModalContent>
            {state === transactionStates.AWAITING_SIGNATURE && (
              <ModalItem>
                <Paragraph>
                  <LoadingText>Awaiting wallet signature</LoadingText>
                </Paragraph>

                <Paragraph>
                  <HelperText>
                    Sign the transaction in your {wallet.connector?.name} wallet to align your
                    sigil.
                  </HelperText>
                </Paragraph>
              </ModalItem>
            )}

            {state === transactionStates.AWAITING_CONFIRMATION && (
              <ModalItem>
                <Paragraph>
                  <LoadingText>Aligning sigil</LoadingText>
                </Paragraph>

                <Paragraph>
                  <HelperText>
                    This may take up to a few minutes. Feel free to close this window and check back
                    later.
                  </HelperText>
                </Paragraph>
              </ModalItem>
            )}

            {state === transactionStates.CONFIRMED && (
              <ModalItem>
                <Paragraph>Success!</Paragraph>

                <Paragraph>
                  <HelperText>Your sigil has been aligned.</HelperText>
                </Paragraph>
              </ModalItem>
            )}

            {state === transactionStates.FAILED && (
              <ModalItem>
                <Paragraph>There was an error processing your transaction.</Paragraph>

                <Paragraph>
                  <HelperText>
                    Make sure you are on the Ethereum network and try again. Reach out on the{' '}
                    <a href="https://discord.gg/eT5hD56Brt" target="_blank" rel="noreferrer">
                      Playgrounds Discord
                    </a>{' '}
                    for help.
                  </HelperText>
                </Paragraph>
              </ModalItem>
            )}
          </ModalContent>
        </ModalContainer>
      </ModalOverlay>
    </ModalPortal>
  );
};
