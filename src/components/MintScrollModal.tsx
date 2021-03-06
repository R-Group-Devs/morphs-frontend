import { useEffect, useMemo } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { TransactionReceipt } from '@ethersproject/providers';
import styled from 'styled-components';
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
import useChainId from '../hooks/useChainId';
import { transactionStates, Transaction } from '../hooks/useExecuteTransaction';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';
import { NFT_EXPLORER_URLS } from '../constants/explorers';

interface Props {
  data: TransactionReceipt | null;
  state: Transaction['state'];
  isBatchMintEnabled: boolean;
  close: () => void;
}

const FooterText = styled.div`
  margin-top: 1.5em;
  font-size: 11px;
  font-weight: 400;
  font-style: italic;
  line-height: 2em;
  color: #999;
`;

export default ({ data, state, isBatchMintEnabled, close }: Props) => {
  const [{ data: wallet }] = useConnect();
  const [{ data: account }] = useAccount();
  const chainId = useChainId();

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
          <ModalTitle close={close}>
            {isBatchMintEnabled ? 'Mint Scrolls' : 'Mint a Scroll'}
          </ModalTitle>

          <ModalContent>
            {state === transactionStates.AWAITING_SIGNATURE && (
              <ModalItem>
                <Paragraph>
                  <LoadingText>Awaiting wallet signature</LoadingText>
                </Paragraph>

                <Paragraph>
                  <HelperText>
                    Sign the mint transaction in your {wallet.connector?.name} wallet.
                  </HelperText>
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
                    {isBatchMintEnabled ? (
                      <a
                        href={`${NFT_EXPLORER_URLS[chainId]}/user/${account?.address}/owned?filter[collections][]=${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        See your scrolls
                      </a>
                    ) : (
                      <a
                        href={`${NFT_EXPLORER_URLS[chainId]}/token/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}:${nftId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        See your scroll
                      </a>
                    )}
                    .
                  </HelperText>

                  <FooterText>
                    If your {isBatchMintEnabled ? 'scrolls do not' : 'scroll does not'} appear
                    immediately using the link above, try waiting a minute and refreshing.
                  </FooterText>
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
