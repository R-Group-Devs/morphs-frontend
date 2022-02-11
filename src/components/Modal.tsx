import { useState, useEffect } from 'react';
import { useConnect, useNetwork, useAccount } from 'wagmi';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { COLORS, FONTS } from '../constants/theme';

interface ContainerProps {
  children: React.ReactNode;
  close: () => void;
}

interface TitleProps {
  children: React.ReactNode;
  close: () => void;
}

const Overlay = styled(Dialog.Overlay)`
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

const Container = styled(Dialog.Content)`
  width: 580px;
  background: ${COLORS.black};
  padding: 0.5em 2em 1em;
  border-radius: 4px;
  box-shadow: #000 0 0 80px;

  @media (max-width: 767px) {
    width: 80%;
  }
`;

const Title = styled(Dialog.Title)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
  font-family: ${FONTS.sansSerif};
  font-size: 28px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Content = styled.div``;

const Item = styled.div`
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

const CloseButton = styled(Dialog.Close)`
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

const ModalContainer = ({ children, close }: ContainerProps) => (
  <Container onPointerDownOutside={() => close()} onEscapeKeyDown={() => close()}>
    {children}
  </Container>
);

const ModalTitle = ({ children, close }: TitleProps) => (
  <Title>
    {children}
    <CloseButton onClick={() => close()}>X</CloseButton>
  </Title>
);

const ModalPortal = Dialog.Portal;

export {
  ModalPortal,
  Overlay as ModalOverlay,
  ModalContainer,
  ModalTitle,
  Content as ModalContent,
  Item as ModalItem,
};