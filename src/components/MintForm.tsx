import { useState, useEffect } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import ConnectWalletModal from './ConnectWalletModal';
import UnsupportedNetworkTooltip from './UnsupportedNetworkTooltip';
import useMint from '../hooks/useMint';
import { transactionStates } from '../hooks/useExecuteTransaction';
import scrollExampleImage from '../assets/images/scroll-example.png';
import { NETWORKS } from '../constants/networks';
import { COLORS, FONTS } from '../constants/theme';

const Container = styled.div`
  margin-left: 22%;
  width: 100%;

  @media (max-width: 767px) {
    margin-top: 2em;
    margin-left: 0;
  }
`;

const ScrollExampleVideo = styled.video`
  margin-top: -0.5em;
  margin-bottom: 1.75em;
  width: 100%;
  height: auto;
  border: 1px solid ${COLORS.white};
`;

const CodeInput = styled.input`
  margin-bottom: 1em;
  padding: 4px 12px;
  width: 100%;
  min-height: 33px;
  font-family: ${FONTS.sansSerif};
  font-size: 14px;
  font-weight: normal;
  line-height: 2em;
  text-align: center;
  color: ${COLORS.black};
  background: #d8d8d8;
  border: none;
  border-radius: 2px;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button<{ $isRestricted: boolean }>`
  padding: 20px 50px;
  width: 100%;
  min-height: 72px;
  background: ${COLORS.primary.normal};
  font-family: ${FONTS.sansSerif};
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  color: ${COLORS.white};
  border: none;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: ${COLORS.primary.light};
    color: #fff;
    outline: none;
    cursor: ${({ $isRestricted }) => ($isRestricted ? 'default' : 'pointer')};
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const HelperText = styled.p`
  margin-top: 0.5em;
  font-family: ${FONTS.sansSerif};
  font-size: 14px;
  font-weight: normal;
  line-height: 2em;
  text-align: center;
  color: ${COLORS.white};
`;

const BUTTON_TEXT = {
  [transactionStates.IDLE]: 'Mint a Scroll',
  [transactionStates.AWAITING_SIGNATURE]: 'Mint a Scroll...',
  [transactionStates.AWAITING_CONFIRMATION]: 'Minting a Scroll...',
  [transactionStates.CONFIRMED]: 'Minted!',
};

export default () => {
  const [{ data: network }] = useNetwork();
  const [{ data: wallet }] = useConnect();
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(false);
  const [hasPendingMint, setHasPendingMint] = useState(false);
  const [{ state, signer }, mint] = useMint();

  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  // TODO: check input code
  const flag = 0;

  useEffect(() => {
    if (wallet.connected && signer && hasPendingMint) {
      setHasPendingMint(false);
      mint(flag);
    }
  }, [mint, flag, wallet, signer, hasPendingMint]);

  return (
    <Container>
      <ScrollExampleVideo
        src="./videos/scrolls-display.mp4"
        autoPlay
        loop
        muted
        playsInline
        controlsList="nodownload"
        poster={scrollExampleImage}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!wallet.connected) {
            setHasPendingMint(true);
            setIsConnectWalletModalOpen(true);
          } else {
            mint(flag);
          }
        }}
      >
        <CodeInput placeholder="If you have a special code, input it here" />

        <UnsupportedNetworkTooltip isVisible={wallet.connected}>
          <SubmitButton
            disabled={
              state === transactionStates.AWAITING_SIGNATURE ||
              state === transactionStates.AWAITING_CONFIRMATION
            }
            $isRestricted={wallet.connected && !isSupportedNetwork}
          >
            {BUTTON_TEXT[state]}
          </SubmitButton>
        </UnsupportedNetworkTooltip>
      </form>

      <HelperText>Minting is free. You just pay gas.</HelperText>

      <Dialog.Root open={isConnectWalletModalOpen}>
        <ConnectWalletModal close={() => setIsConnectWalletModalOpen(false)} />
      </Dialog.Root>
    </Container>
  );
};
