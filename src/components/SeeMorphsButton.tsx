import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import useGlobalState from '../hooks/useGlobalState';
import { COLORS, FONTS } from '../constants/theme';

const Container = styled.div`
  text-align: center;
`;

// TODO: extract into common file
const ButtonStyles = css`
  margin: 0 2em;
  padding: 20px 50px;
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

const SeeMorphsButton = styled.button<{ $isConnected: boolean }>`
  ${ButtonStyles}
  display: block;
  font-size: 20px;
  font-size: ${({ $isConnected }) => ($isConnected ? '24px' : '20px')};
  line-height: 32px;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export default () => {
  const [{ data: account }] = useAccount({
    fetchEns: true,
  });
  const [, setIsConnectWalletModalOpen] = useGlobalState('isConnectWalletModalOpen');
  const [hasPendingMorphsPageVisit, setHasPendingMorphsPageVisit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasPendingMorphsPageVisit && account) {
      navigate(`/address/${account?.address}`);
      setHasPendingMorphsPageVisit(false);
    }
  }, [hasPendingMorphsPageVisit, account, navigate]);

  return (
    <Container>
      <SeeMorphsButton
        $isConnected={false}
        onClick={(e) => {
          e.preventDefault();
          setHasPendingMorphsPageVisit(true);
          setIsConnectWalletModalOpen(true);
        }}
      >
        Connect to see your morphs
      </SeeMorphsButton>
    </Container>
  );
};
