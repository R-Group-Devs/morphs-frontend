import { useState } from 'react';
import { useConnect, useNetwork, useAccount } from 'wagmi';
import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import ConnectWalletModal from './ConnectWalletModal';
import useShouldAutoConnect from '../hooks/useShouldAutoConnect';
import { shortenAddress } from '../utils/address';
import { NETWORKS } from '../constants/networks';
import { COLORS, FONTS } from '../constants/theme';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ConnectWalletButton = styled(Dialog.Trigger)<{ $isConnected: boolean }>`
  padding: 15px 25px;
  font-family: ${FONTS.sansSerif};
  font-size: 18px;
  font-weight: bold;
  line-height: normal;
  text-transform: ${({ $isConnected }) => ($isConnected ? 'none' : 'uppercase')};
  color: ${COLORS.white};
  background: none;
  border: 2px solid ${COLORS.primary.normal};
  transition: all 0.3s;

  &:hover {
    background: ${COLORS.primary.light};
    color: #fff;
    outline: none;
    cursor: pointer;
  }

  &:active {
    position: relative;
    top: 1px;
  }

  @media (max-width: 580px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

const scaleInAnimation = keyframes({
  '0%': { opacity: 0, transform: 'scale(0)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

const Network = styled(Tooltip.Trigger)<{ $isSupported: boolean }>`
  margin-right: 2em;
  font-family: ${FONTS.sansSerifAlt};
  font-size: 14px;
  color: ${COLORS.white};
  background: none;
  border: none;

  &:before {
    content: '';
    position: relative;
    top: -1px;
    margin-right: 0.75em;
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: ${({ $isSupported }) => ($isSupported ? 'lime' : COLORS.accent.normal)};
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const TooltipContent = styled(Tooltip.Content)<{ $isVisible: boolean }>`
  padding: 0.25em 1.5em;
  font-family: ${FONTS.sansSerifAlt};
  font-size: 12px;
  background: #444;
  border-radius: 2px;
  display: ${({ $isVisible }) => ($isVisible ? 'inherit' : 'none')};
  transform-origin: var(--radix-tooltip-content-transform-origin);
  animation: ${scaleInAnimation} 0.1s ease-out;
`;

const TooltipArrow = styled(Tooltip.Arrow)`
  fill: #444;
`;

export default () => {
  const [{ data: wallet }] = useConnect();
  const [{ data: network }] = useNetwork();
  const [{ data: account }] = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const shouldAutoConnect = useShouldAutoConnect();

  const supportedNetworks = Object.values(NETWORKS).map(
    (chainId) => network?.chains?.find((chain) => chain.id === chainId)?.name
  );
  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  const connectedWalletText = account?.ens?.name ?? shortenAddress(account?.address ?? '');

  const isConnectWalletButtonVisible =
    !shouldAutoConnect || (shouldAutoConnect && wallet.connected);

  return (
    <Container>
      {wallet.connected && (
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={200}>
            <Network $isSupported={isSupportedNetwork}>
              {isSupportedNetwork ? network.chain?.name : 'Unsupported network'}
            </Network>

            <TooltipContent sideOffset={5} $isVisible={!isSupportedNetwork}>
              <TooltipArrow />
              <p>This app only supports the following networks: {supportedNetworks.join(', ')}</p>
            </TooltipContent>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}

      <Dialog.Root open={isOpen}>
        {isConnectWalletButtonVisible && (
          <ConnectWalletButton onClick={() => setIsOpen(true)} $isConnected={wallet.connected}>
            {wallet.connected ? connectedWalletText : 'Connect Wallet'}
          </ConnectWalletButton>
        )}

        <ConnectWalletModal close={() => setIsOpen(false)} />
      </Dialog.Root>
    </Container>
  );
};