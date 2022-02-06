import { useState } from 'react';
import { useConnect, useAccount } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { shortenAddress } from '../utils/address';
import metamaskIcon from '../assets/images/icons/metamask.png';
import walletConnectIcon from '../assets/images/icons/walletconnect.png';
import walletLinkIcon from '../assets/images/icons/walletlink.png';
import { COLORS, FONTS } from '../constants/theme';

const WALLET_ICONS: Record<string, string> = {
  injected: metamaskIcon,
  walletConnect: walletConnectIcon,
  walletLink: walletLinkIcon,
};

const ConnectWalletButton = styled(Dialog.Trigger)`
  padding: 15px 25px;
  font-family: ${FONTS.sansSerif};
  font-size: 18px;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
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

const ModalOverlay = styled(Dialog.Overlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled(Dialog.Content)`
  width: 580px;
  background: ${COLORS.black};
  padding: 1em 2em;
  border-radius: 4px;
  box-shadow: #000 0 0 80px;

  @media (max-width: 767px) {
    width: 80%;
  }
`;

const ModalTitle = styled(Dialog.Title)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25em;
  font-family: ${FONTS.sansSerif};
  font-size: 28px;
  font-weight: 600;
  text-transform: uppercase;
`;

const ModalContent = styled.div``;

const WalletProvider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em 0;
  padding: 1.25em 2em;
  height: 64px;
  font-weight: 600;
  border: 1px solid ${COLORS.primary.normal};

  &:hover {
    cursor: pointer;
  }
`;

const WalletIcon = styled.img`
  width: 24px;
`;

const ModalCloseButton = styled(Dialog.Close)`
  font-size: 24px;
  font-weight: 600;
  color: ${COLORS.white};
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export default () => {
  const [{ data: wallet }, connect] = useConnect();
  const [{ data: account }] = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const connectedWalletText = account?.ens?.name ?? shortenAddress(account?.address ?? '');

  return (
    <Dialog.Root open={isOpen}>
      <ConnectWalletButton onClick={() => setIsOpen(true)}>
        {wallet.connected ? connectedWalletText : 'Connect Wallet'}
      </ConnectWalletButton>

      <Dialog.Portal>
        <ModalOverlay>
          <ModalContainer
            onPointerDownOutside={() => setIsOpen(false)}
            onEscapeKeyDown={() => setIsOpen(false)}
          >
            <ModalTitle>
              <span>Select a Wallet</span>
              <ModalCloseButton onClick={() => setIsOpen(false)}>X</ModalCloseButton>
            </ModalTitle>

            <ModalContent>
              {wallet.connectors.map((connector) => (
                <WalletProvider
                  key={connector.id}
                  onClick={async () => {
                    await connect(connector);
                    setIsOpen(false);
                  }}
                >
                  <span>{connector.name}</span>
                  <WalletIcon src={WALLET_ICONS[connector.id]}></WalletIcon>
                </WalletProvider>
              ))}
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
