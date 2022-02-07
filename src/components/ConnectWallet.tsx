import { useState, useEffect } from 'react';
import { useNetwork, useConnect, useAccount } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { shortenAddress } from '../utils/address';
import { WALLETS } from '../constants/wallets';
import { BLOCK_EXPLORER_URLS } from '../constants/explorers';
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

const ModalItem = styled.div`
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

const ConnectedWalletDetails = styled(ModalItem)`
  flex-direction: column;
  align-items: start;
  height: auto;

  &:hover {
    cursor: default;
  }
`;

const ConnectedWalletHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ChangeWalletButton = styled.button`
  padding: 5px 10px;
  font-family: ${FONTS.sansSerif};
  font-weight: 600;
  color: ${COLORS.white};
  border: 2px solid ${COLORS.primary.normal};
  background: none;
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
`;

const ConnectedWalletAddress = styled.div`
  margin-top: 0.5em;
  font-size: 22px;
  font-weight: 600;
`;

const WalletProviderDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const WalletProviderDescription = styled.div`
  margin-top: 1em;
  font-size: 14px;
  font-weight: 400;
`;

const WalletIcon = styled.img`
  width: 24px;
`;

const ModalActions = styled.div`
  display: flex;
  margin-top: 1.25em;
  font-family: ${FONTS.sansSerifAlt};
`;

const ModalAction = styled.a`
  margin-right: 2em;
  display: inline-block;
  font-size: 12px;
  font-weight: 300;
  border-bottom-color: transparent !important;

  &:hover {
    border-bottom-color: inherit !important;
    cursor: pointer;
  }
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
  const [{ data: network }] = useNetwork();
  const [{ data: wallet, loading: isConnectingWallet }, connect] = useConnect();
  const [{ data: account }, disconnect] = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const connectedWalletText = account?.ens?.name ?? shortenAddress(account?.address ?? '');

  useEffect(() => {
    if (isAddressCopied) {
      setTimeout(() => setIsAddressCopied(false), 500);
    }
  }, [isAddressCopied]);

  return (
    <Dialog.Root open={isOpen}>
      <ConnectWalletButton onClick={() => setIsOpen(true)} $isConnected={wallet.connected}>
        {wallet.connected ? connectedWalletText : 'Connect Wallet'}
      </ConnectWalletButton>

      <Dialog.Portal>
        <ModalOverlay>
          <ModalContainer
            onPointerDownOutside={() => setIsOpen(false)}
            onEscapeKeyDown={() => setIsOpen(false)}
          >
            <ModalTitle>
              <span>{wallet.connected ? 'Account' : 'Select a Wallet'}</span>
              <ModalCloseButton onClick={() => setIsOpen(false)}>X</ModalCloseButton>
            </ModalTitle>

            <ModalContent>
              {wallet.connected && (
                <ConnectedWalletDetails>
                  <ConnectedWalletHeading>
                    <span>Connected with {wallet.connector?.name}</span>
                    <ChangeWalletButton onClick={() => disconnect()}>Change</ChangeWalletButton>
                  </ConnectedWalletHeading>
                  <ConnectedWalletAddress>{connectedWalletText}</ConnectedWalletAddress>

                  <ModalActions>
                    <CopyToClipboard
                      text={account?.address ?? ''}
                      onCopy={() => {
                        setIsAddressCopied(true);
                      }}
                    >
                      <ModalAction>{isAddressCopied ? 'Copied' : 'Copy address'}</ModalAction>
                    </CopyToClipboard>

                    {/* use mainnet fallback */}
                    <ModalAction
                      href={`${BLOCK_EXPLORER_URLS[network?.chain?.id || 4]}/address/${
                        account?.address
                      }`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on explorer
                    </ModalAction>

                    <ModalAction
                      onClick={(e) => {
                        e.preventDefault();
                        disconnect();
                      }}
                    >
                      Disconnect
                    </ModalAction>
                  </ModalActions>
                </ConnectedWalletDetails>
              )}

              {!wallet.connected && !isConnectingWallet && (
                <>
                  {wallet.connectors.map((connector) => (
                    <ModalItem
                      key={connector.id}
                      onClick={async () => {
                        await connect(connector);
                        setIsOpen(false);
                      }}
                    >
                      <span>{connector.name}</span>
                      <WalletIcon src={WALLETS[connector.id].icon} />
                    </ModalItem>
                  ))}
                </>
              )}

              {isConnectingWallet && (
                <>
                  <ConnectedWalletDetails>Initializing...</ConnectedWalletDetails>

                  <ConnectedWalletDetails>
                    <WalletProviderDetails>
                      <div>
                        <div>{wallet.connector?.name}</div>

                        {wallet.connector?.id && (
                          <WalletProviderDescription>
                            {WALLETS[wallet.connector.id].description}
                          </WalletProviderDescription>
                        )}
                      </div>

                      {wallet.connector?.id && (
                        <WalletIcon src={WALLETS[wallet.connector.id].icon} />
                      )}
                    </WalletProviderDetails>
                  </ConnectedWalletDetails>
                </>
              )}
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
