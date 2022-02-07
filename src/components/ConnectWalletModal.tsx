import { useState, useEffect } from 'react';
import { useConnect, useNetwork, useAccount } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { shortenAddress } from '../utils/address';
import { NETWORKS } from '../constants/networks';
import { WALLETS } from '../constants/wallets';
import { BLOCK_EXPLORER_URLS } from '../constants/explorers';
import { COLORS, FONTS } from '../constants/theme';

interface Props {
  close: () => void;
}

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
  padding: 0.5em 2em 1em;
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
  margin-bottom: 1em;
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
  flex-direction: column;
  align-items: start;
  margin: 1em 0;
  padding: 1.25em 2em;
  font-weight: 600;
  border: 1px solid ${COLORS.primary.normal};
  transition: all 0.3s;
`;

const WalletProviderOption = styled(ModalItem)`
  flex-direction: row;
  height: 64px;

  &:hover {
    background: ${COLORS.primary.light};
    cursor: pointer;
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
  background: ${COLORS.primary.normal};
  border: none;
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
  color: #999 !important;
  border-bottom-color: transparent !important;

  &:hover {
    border-bottom-color: inherit !important;
    cursor: pointer;
  }

  &:focus {
    outline-color: #999 !important;
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

export default ({ close }: Props) => {
  const [{ data: network }] = useNetwork();
  const [{ data: wallet, loading: isConnectingWallet }, connect] = useConnect();
  const [{ data: account }, disconnect] = useAccount();
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  const connectedWalletText = account?.ens?.name ?? shortenAddress(account?.address ?? '');

  useEffect(() => {
    if (isAddressCopied) {
      const timeout = setTimeout(() => setIsAddressCopied(false), 500);

      return () => clearTimeout(timeout);
    }
  }, [isAddressCopied]);

  return (
    <Dialog.Portal>
      <ModalOverlay>
        <ModalContainer onPointerDownOutside={() => close()} onEscapeKeyDown={() => close()}>
          <ModalTitle>
            <span>{wallet.connected ? 'Account' : 'Select a Wallet'}</span>
            <ModalCloseButton onClick={() => close()}>X</ModalCloseButton>
          </ModalTitle>

          <ModalContent>
            {wallet.connected && (
              <ModalItem>
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

                  {/* TODO: use mainnet fallback */}
                  {isSupportedNetwork && (
                    <ModalAction
                      href={`${BLOCK_EXPLORER_URLS[network?.chain?.id || 4]}/address/${
                        account?.address
                      }`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on explorer
                    </ModalAction>
                  )}

                  <ModalAction
                    onClick={(e) => {
                      e.preventDefault();
                      disconnect();
                    }}
                  >
                    Disconnect
                  </ModalAction>
                </ModalActions>
              </ModalItem>
            )}

            {!wallet.connected && !isConnectingWallet && (
              <>
                {wallet.connectors.map((connector) => (
                  <WalletProviderOption
                    key={connector.id}
                    onClick={async () => {
                      await connect(connector);
                      close();
                    }}
                  >
                    <span>{connector.name}</span>
                    <WalletIcon src={WALLETS[connector.id].icon} />
                  </WalletProviderOption>
                ))}
              </>
            )}

            {isConnectingWallet && (
              <>
                <ModalItem>Initializing...</ModalItem>

                <ModalItem>
                  <WalletProviderDetails>
                    <div>
                      <div>{wallet.connector?.name}</div>

                      {wallet.connector?.id && (
                        <WalletProviderDescription>
                          {WALLETS[wallet.connector.id].description}
                        </WalletProviderDescription>
                      )}
                    </div>

                    {wallet.connector?.id && <WalletIcon src={WALLETS[wallet.connector.id].icon} />}
                  </WalletProviderDetails>
                </ModalItem>
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </ModalOverlay>
    </Dialog.Portal>
  );
};
