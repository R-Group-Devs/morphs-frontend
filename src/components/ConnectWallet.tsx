import { useState } from 'react';
import { useConnect, useAccount } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { shortenAddress } from '../utils/address';
import metamaskIcon from '../assets/images/icons/metamask.png';

const WALLET_ICONS: Record<string, string> = {
  injected: metamaskIcon,
};

const ConnectWalletButton = styled(Dialog.Trigger)`
  padding: 15px 25px;
  font-family: 'Space Grotesk', Sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  color: #f8f4ec;
  background: none;
  border: 3px solid #5b4dc8;
  transition: all 0.3s;

  &:hover {
    background: #7265d7;
    color: #ffffff;
    cursor: pointer;
  }
`;

const ModalOverlay = styled(Dialog.Overlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled(Dialog.Content)`
  width: 580px;
  background: #1a1a1a;
  padding: 1em 2em;
  border-radius: 4px;
  box-shadow: #000 0 0 80px;
`;

const ModalTitle = styled(Dialog.Title)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25em;
  font-family: 'Space Grotesk', Sans-serif;
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
  font-weight: 600;
  border: 1px solid #5b4dc8;

  &:hover {
    cursor: pointer;
  }
`;

const WalletIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ModalCloseButton = styled(Dialog.Close)`
  font-size: 24px;
  font-weight: 600;
  color: #f8f4ec;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export default () => {
  const [{ data: wallet }, connect] = useConnect();
  const [{ data: account }] = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen}>
      <ConnectWalletButton onClick={() => setIsOpen(true)}>
        {wallet.connected
          ? account?.ens?.name ?? shortenAddress(account?.address ?? '')
          : 'Connect Wallet'}
      </ConnectWalletButton>

      <Dialog.Portal>
        <ModalOverlay>
          <ModalContainer onPointerDownOutside={() => setIsOpen(false)}>
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
