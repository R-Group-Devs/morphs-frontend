import { useEffect, useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { TransactionReceipt } from '@ethersproject/providers';
import styled, { keyframes } from 'styled-components';
import {
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalItem,
} from './Modal';
import { transactionStates, Transaction } from '../hooks/useExecuteTransaction';
import {
  PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES,
  MORPHS_NFT_CONTRACT_ADDRESSES,
} from '../constants/contracts';
import { NFT_EXPLORER_URLS } from '../constants/explorers';

interface Props {
  data: TransactionReceipt | null;
  state: Transaction['state'];
  close: () => void;
}

const Paragraph = styled.p`
  margin: 0.25em 0 0.5em 0;
`;

const HelperText = styled.span`
  margin-top: 0.25em;
  font-size: 11px;
  font-weight: 300;
`;

const ellipsis = keyframes`
  to {
    width: 2.1em;
  }
`;

const LoadingText = styled.div`
  &:after {
    content: '...';
    margin-left: 0.1em;
    width: 0;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4, end) 900ms infinite;
    overflow: hidden;
  }
`;

export default ({ data, state, close }: Props) => {
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
              <ModalItem>
                <Paragraph>
                  <LoadingText>Awaiting wallet signature</LoadingText>
                </Paragraph>

                <Paragraph>
                  <HelperText>Sign the mint transaction in your wallet provider.</HelperText>
                </Paragraph>
              </ModalItem>
            )}

            {state === transactionStates.AWAITING_CONFIRMATION && (
              <ModalItem>
                <Paragraph>
                  <LoadingText>Minting</LoadingText>
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
                  <HelperText>
                    You feel a pulse of strange energy...{' '}
                    {nftId ? (
                      <a
                        href={`${NFT_EXPLORER_URLS[chainId]}/token/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}:${nftId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        See your scroll
                      </a>
                    ) : (
                      <a
                        href={`${NFT_EXPLORER_URLS[chainId]}/collection/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        See your scroll
                      </a>
                    )}
                    .
                  </HelperText>
                </Paragraph>
              </ModalItem>
            )}

            {state === transactionStates.FAILED && (
              <ModalItem>
                <Paragraph>There was an error processing your transaction.</Paragraph>

                <Paragraph>
                  <HelperText>
                    Please try again or reach out on the{' '}
                    <a href="https://discord.gg/cXxFndSu" target="_blank" rel="noreferrer">
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
