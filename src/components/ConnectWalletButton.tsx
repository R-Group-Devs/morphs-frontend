import { useConnect, useNetwork, useAccount } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { useMediaQuery } from 'react-responsive';
import UnsupportedNetworkTooltip from './UnsupportedNetworkTooltip';
import useGlobalState from '../hooks/useGlobalState';
import { shortenAddress } from '../utils/address';
import { NETWORKS } from '../constants/networks';
import { COLORS, FONTS } from '../constants/theme';

const Container = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 650px) {
    width: 100%;
  }
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

  @media (max-width: 650px) {
    padding: 20px;
    width: 100%;
    display: block;
    font-size: 16px;
  }
`;

const NetworkTooltip = styled(UnsupportedNetworkTooltip)`
  margin: 0 1.5em;
`;

const Network = styled.div<{ $isSupported: boolean }>`
  padding: 0 0.5em;
  max-width: 120px;
  font-family: ${FONTS.mono};
  font-size: 14px;
  color: ${COLORS.white};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

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
`;

export default () => {
  const [{ data: wallet }] = useConnect();
  const [{ data: network }] = useNetwork();
  const [{ data: account }] = useAccount({
    fetchEns: true,
  });
  const [isOpen, setIsOpen] = useGlobalState('isConnectWalletModalOpen');

  const isSupportedNetwork =
    !!network.chain?.id && Object.values(NETWORKS).includes(network.chain?.id);

  const ensNameIsInBounds = account?.ens?.name && account?.ens?.name.length <= 12;

  const connectedWalletText = ensNameIsInBounds
    ? account?.ens?.name
    : shortenAddress(account?.address ?? '');

  const isXSmallViewport = useMediaQuery({
    query: '(max-width: 650px)',
  });

  const isSmallViewport = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <Container>
      {wallet.connected && (
        <NetworkTooltip isContentVisible={!isSmallViewport}>
          <Network $isSupported={isSupportedNetwork}>
            {network.chain?.id === 1
              ? 'Ethereum'
              : network.chain?.id === 137
              ? 'Polygon'
              : network.chain?.name}
          </Network>
        </NetworkTooltip>
      )}

      <Dialog.Root open={isOpen}>
        <ConnectWalletButton onClick={() => setIsOpen(true)} $isConnected={wallet.connected}>
          {wallet.connected
            ? isXSmallViewport
              ? `Connected as ${connectedWalletText}`
              : connectedWalletText
            : 'Connect Wallet'}
        </ConnectWalletButton>
      </Dialog.Root>
    </Container>
  );
};
