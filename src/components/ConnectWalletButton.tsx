import { useState } from 'react';
import { useConnect, useNetwork, useAccount } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import ConnectWalletModal from './ConnectWalletModal';
import UnsupportedNetworkTooltip from './UnsupportedNetworkTooltip';
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

const Network = styled.div<{ $isSupported: boolean }>`
  margin-right: 2em;
  font-family: ${FONTS.sansSerifAlt};
  font-size: 14px;
  color: ${COLORS.white};

  &:hover {
    cursor: default;
  }

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

export default () => {
  const [{ data: wallet }] = useConnect();
  const [{ data: network }] = useNetwork();
  const [{ data: account }] = useAccount({
    fetchEns: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const shouldAutoConnect = useShouldAutoConnect();

  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  const connectedWalletText = account?.ens?.name ?? shortenAddress(account?.address ?? '');

  const isConnectWalletButtonVisible =
    !shouldAutoConnect || (shouldAutoConnect && wallet.connected);

  return (
    <Container>
      {wallet.connected && (
        <UnsupportedNetworkTooltip>
          <Network $isSupported={isSupportedNetwork}>
            {isSupportedNetwork ? network.chain?.name : 'Unsupported network'}
          </Network>
        </UnsupportedNetworkTooltip>
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
