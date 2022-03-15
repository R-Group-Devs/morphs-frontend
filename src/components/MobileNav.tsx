import { useState, useEffect, useRef, forwardRef, ForwardedRef, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useConnect, useAccount } from 'wagmi';
import { OverlayStyles } from '../styles/Overlay';
import MenuIcon from '../assets/images/icons/menu.svg';
import CloseIcon from '../assets/images/icons/close.svg';
import { COLORS } from '../constants/theme';

interface OverlayProps {
  isVisible: boolean;
  children: React.ReactNode;
  onClick: MouseEventHandler;
}

const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? 0 : '-320px')};
  padding-top: 64px;
  width: 320px;
  height: 100vh;
  background: ${COLORS.black};
  transition: right 0.3s;

  @media (max-width: 650px) {
    right: ${({ $isOpen }) => ($isOpen ? 0 : '-100vw')};
    width: 100vw;
    text-align: center;
  }
`;

const Overlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  z-index: 1;
  transition: all 0.3s;
  ${OverlayStyles}
`;

const ForwardedOverlay = forwardRef(
  ({ isVisible, children, onClick, ...rest }: OverlayProps, ref: ForwardedRef<HTMLDivElement>) => (
    <Overlay ref={ref} $isVisible={isVisible} onClick={onClick} {...rest}>
      {children}
    </Overlay>
  )
);

const Nav = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style: none;
  font-size: 22px;
`;

const NavItem = styled.li``;

const NavLinkStyles = css`
  display: inline-block;
  padding: 1em 1.5em;
  border-bottom: none;

  @media (max-width: 650px) {
    padding: 1.25em 1.5em;
  }

  &:hover {
    border-bottom-color: none;
  }

  &:focus {
    outline: none;
  }

  & span {
    border-bottom: 1px solid ${COLORS.accent.normal};
    transition: all 0.2s linear;
  }

  &:hover span {
    border-bottom-color: ${COLORS.accent.light};
  }
`;

const NavLink = styled(Link)`
  ${NavLinkStyles}
`;

const NavLinkExternal = styled.a`
  ${NavLinkStyles}
`;

const MobileNavExpandIcon = styled.img`
  margin-left: 32px;
  width: 25px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 650px) {
    margin-right: 0;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  top: 32px;
  right: 32px;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 650px) {
    position: static;
    width: 20px;
    height: 20px;
  }
`;

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [{ data: wallet }] = useConnect();
  const [{ data: account }] = useAccount();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <>
      <MobileNavExpandIcon src={MenuIcon} onClick={() => setIsOpen(true)} alt="" />

      <ForwardedOverlay
        isVisible={isOpen}
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === overlayRef.current) {
            setIsOpen(false);
          }
        }}
      >
        <Container $isOpen={isOpen}>
          <CloseButton src={CloseIcon} role="button" onClick={() => setIsOpen(false)} />

          <Nav>
            <NavItem>
              <NavLinkExternal
                href="https://codex.morphs.wtf"
                onClick={() => setIsOpen(false)}
                target="_blank"
                rel="noreferrer"
              >
                <span>Codex</span> 📖
              </NavLinkExternal>
            </NavItem>

            <NavItem>
              <NavLink
                to={wallet.connected ? `/address/${account?.address}` : '/connect'}
                onClick={() => setIsOpen(false)}
              >
                <span>My Morphs</span> 👤
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/alignments" onClick={() => setIsOpen(false)}>
                <span>Alignments</span> 🛡
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </ForwardedOverlay>
    </>
  );
};
