import { useState } from 'react';
import { useConnect, useAccount } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import ConnectWalletModal from './ConnectWalletModal';
import useShouldAutoConnect from '../hooks/useShouldAutoConnect';
import { shortenAddress } from '../utils/address';
import { COLORS, FONTS } from '../constants/theme';

const ConnectWalletButton = styled(Dialog.Trigger)<{ $isConnected: boolean }>`
  padding: 15px 25px;
  font-family: ${FONTS.sansSerif};
  font-size: 18px;
  font-weight: bold;
  line-height: normal;
  text-transform: ${({ $isConnected }) => ($isConnected ? 'none' : 'uppercase')};
  color: ${COLORS.white};
  background: none;
  border: 3px solid ${COLORS.primary.normal};
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

export default () => {
  const [{ data: wallet }] = useConnect();
  const [{ data: account }] = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const shouldAutoConnect = useShouldAutoConnect();

  const connectedWalletText = account?.ens?.name ?? shortenAddress(account?.address ?? '');

  const isConnectWalletButtonVisible =
    !shouldAutoConnect || (shouldAutoConnect && wallet.connected);

  return (
    <Dialog.Root open={isOpen}>
      {isConnectWalletButtonVisible && (
        <ConnectWalletButton onClick={() => setIsOpen(true)} $isConnected={wallet.connected}>
          {wallet.connected ? connectedWalletText : 'Connect Wallet'}
        </ConnectWalletButton>
      )}

      <ConnectWalletModal close={() => setIsOpen(false)} />
    </Dialog.Root>
  );
};
