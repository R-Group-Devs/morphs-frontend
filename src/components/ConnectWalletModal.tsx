import { useState, useEffect } from 'react';
import { useConnect, useNetwork, useAccount } from 'wagmi';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
import { shortenAddress } from '../utils/address';
import { NETWORKS } from '../constants/networks';
import { WALLETS } from '../constants/wallets';
import { BLOCK_EXPLORER_URLS } from '../constants/explorers';
import { COLORS, FONTS } from '../constants/theme';

interface Props {
  isOpen: boolean;
  close: () => void;
}

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

const WalletProviderOption = styled(ModalItem)`
  flex-direction: row;
  align-items: center;
  height: 64px;

  &:hover {
    background: ${COLORS.primary.light};
    cursor: pointer;
  }
`;

const WalletIcon = styled.img`
  width: 24px;
`;

const ConnectedWalletHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 767px) {
    margin-top: 0.5em;
    justify-content: center;
    text-align: center;
  }
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

  @media (max-width: 767px) {
    display: none;
  }
`;

const ConnectedWalletAddress = styled.div`
  margin-top: 0.5em;
  font-size: 22px;
  font-weight: 600;

  @media (max-width: 767px) {
    margin-top: 1em;
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const ModalActions = styled.div`
  display: flex;
  margin-top: 1.25em;

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ModalAction = styled.a`
  margin-right: 2em;
  display: inline-block;
  font-size: 12px;
  font-weight: 300;

  & {
    color: #999;
    border-bottom-color: transparent;
  }

  &:hover {
    color: ${COLORS.white};
    border-bottom-color: ${COLORS.white};
    cursor: pointer;
  }

  &:focus {
    outline-color: #999;
  }

  @media (max-width: 767px) {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    padding: 15px 25px;
    display: block;
    width: 100%;
    font-family: ${FONTS.sansSerif};
    font-size: 18px;
    font-weight: bold;
    line-height: normal;
    text-transform: uppercase;
    text-align: center;
    background: ${COLORS.primary.normal};
    transition: all 0.3s;

    & {
      color: ${COLORS.white};
    }

    &:hover {
      background: ${COLORS.primary.light};
      border-bottom-color: transparent;
      text-decoration: none;
      color: #fff;
      outline: none;
      cursor: pointer;
    }

    &:active {
      position: relative;
      top: 1px;
    }
  }
`;

export default ({ isOpen, close }: Props) => {
  const [{ data: network }] = useNetwork();
  const [{ data: wallet, loading: isConnecting, error: connectionError }, connect] = useConnect();
  const [{ data: account }, disconnect] = useAccount({
    fetchEns: true,
  });
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [hasSeenConnectionError, setHasSeenConnectionError] = useState(false);
  const chainId = useChainId();

  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  const connectedWalletText = account?.ens?.name ?? shortenAddress(account?.address ?? '');

  const isSmallViewport = useMediaQuery({
    query: '(max-width: 767px)',
  });

  useEffect(() => {
    if (isAddressCopied) {
      const timeout = setTimeout(() => setIsAddressCopied(false), 500);

      return () => clearTimeout(timeout);
    }
  }, [isAddressCopied]);

  useEffect(() => {
    if (isConnecting) {
      setHasSeenConnectionError(false);
    }
  }, [isConnecting]);

  useEffect(() => {
    if (!isOpen && connectionError) {
      setHasSeenConnectionError(true);
    }
  }, [isOpen, connectionError]);

  return (
    <ModalPortal>
      <ModalOverlay>
        <ModalContainer close={close}>
          <ModalTitle close={close}>
            <span>{wallet.connected ? 'Account' : 'Select a Wallet'}</span>
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
                  {!isSmallViewport && (
                    <CopyToClipboard
                      text={account?.address ?? ''}
                      onCopy={() => {
                        setIsAddressCopied(true);
                      }}
                    >
                      <ModalAction>{isAddressCopied ? 'Copied' : 'Copy address'}</ModalAction>
                    </CopyToClipboard>
                  )}

                  {isSupportedNetwork && !isSmallViewport && (
                    <ModalAction
                      href={`${BLOCK_EXPLORER_URLS[chainId]}/address/${account?.address}`}
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

            {!wallet.connected && !isConnecting && (!connectionError || hasSeenConnectionError) && (
              <>
                {wallet.connectors.map((connector) => (
                  <WalletProviderOption
                    key={connector.id}
                    onClick={async () => {
                      if (connector.id === 'walletConnect' || connector.id === 'walletLink') {
                        connect(connector);
                        close();
                      } else {
                        const { error } = await connect(connector);

                        if (!error) {
                          close();
                        }
                      }
                    }}
                  >
                    <span>{connector.name}</span>
                    <WalletIcon src={WALLETS[connector.id].icon} />
                  </WalletProviderOption>
                ))}
              </>
            )}

            {isConnecting && (
              <>
                <ModalItem>
                  <LoadingText>Initializing</LoadingText>
                </ModalItem>

                {wallet.connector && (
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

                      {wallet.connector?.id && (
                        <WalletIcon src={WALLETS[wallet.connector.id].icon} />
                      )}
                    </WalletProviderDetails>
                  </ModalItem>
                )}
              </>
            )}

            {connectionError && !hasSeenConnectionError && !wallet.connected && (
              <ModalItem>
                <Paragraph>There was an error connecting to your wallet.</Paragraph>

                <Paragraph>
                  <HelperText>
                    Make sure you have the wallet provider software downloaded. Reach out on the{' '}
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
