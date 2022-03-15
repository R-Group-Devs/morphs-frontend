import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import useGlobalState from '../hooks/useGlobalState';
import ButtonStyles from '../styles/Button';

const Container = styled.div`
  text-align: center;
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
