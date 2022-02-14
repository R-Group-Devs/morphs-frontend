import { forwardRef, ForwardedRef } from 'react';
import styled, { css } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { useSpring, animated } from 'react-spring';
import { COLORS, FONTS } from '../constants/theme';

interface OverlayProps {
  children: React.ReactNode;
}

interface ContainerProps {
  children: React.ReactNode;
  close: () => void;
}

interface TitleProps {
  children: React.ReactNode;
  close: () => void;
}

export const ModalOverlayStyles = css`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
`;

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
  ${ModalOverlayStyles}

  @media (max-width: 767px) {
    align-items: start;
  }
`;

const Container = styled(Dialog.Content)`
  width: 600px;
  background: ${COLORS.black};
  padding: 0.5em 2em 1em;
  border-radius: 4px;
  box-shadow: #000 0 0 80px;

  @media (max-width: 767px) {
    width: 100%;
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

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  align-items: start;
  margin: 1em 0;
  padding: 1.25em 2em;
  width: 100%;
  font-family: ${FONTS.mono};
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.white};
  border: 1px solid ${COLORS.primary.normal};
  background: none;
  transition: all 0.3s;
`;

const CloseButton = styled(Dialog.Close)`
  font-size: 24px;
  font-weight: 600;
  color: ${COLORS.white};
  background: none;
  border: none;
  transition: all 0.3s;

  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const ModalOverlay = forwardRef(({ children }: OverlayProps, ref: ForwardedRef<HTMLDivElement>) => {
  const animationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 200,
    },
  });

  return (
    <animated.div style={animationProps}>
      <Overlay ref={ref}>{children}</Overlay>
    </animated.div>
  );
});

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
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  Content as ModalContent,
  Item as ModalItem,
  Button as ModalButton,
};
