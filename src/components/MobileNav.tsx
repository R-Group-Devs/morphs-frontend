import { useState, useRef, forwardRef, ForwardedRef, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { OverlayStyles } from '../styles/Overlay';
import MenuIcon from '../assets/images/icons/menu.svg';
import { COLORS } from '../constants/theme';

interface OverlayProps {
  isVisible: boolean;
  children: React.ReactNode;
  onClick: MouseEventHandler;
}

const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? 0 : '-300px')};
  width: 300px;
  height: 100vh;
  background: ${COLORS.black};
  transition: left 0.3s;
  z-index: 1;
`;

const Overlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
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
  display: block;
  padding: 1em 1.5em;
  width: 100%;
  color: #fff;
  border-bottom: 1px solid ${lighten(0.1, COLORS.black)};

  &:hover {
    color: ${COLORS.primary.normal};
    border-bottom-color: ${lighten(0.1, COLORS.black)};
  }

  &:focus {
    outline: none;
  }
`;

const NavLink = styled(Link)`
  ${NavLinkStyles}
`;

const NavLinkExternal = styled.a`
  ${NavLinkStyles}
`;

const MobileNavExpandIcon = styled.img`
  margin-right: 32px;
  width: 25px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 650px) {
    margin-right: 0;
  }
`;

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [{ data: account }] = useAccount();

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
          <Nav>
            <NavItem>
              <NavLinkExternal
                href="https://codex.morphs.wtf"
                onClick={() => setIsOpen(false)}
                target="_blank"
                rel="noreferrer"
              >
                Codex
              </NavLinkExternal>
            </NavItem>

            <NavItem>
              <NavLink to={`/address/${account?.address}`} onClick={() => setIsOpen(false)}>
                My Scrolls
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/alignments" onClick={() => setIsOpen(false)}>
                Alignments
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </ForwardedOverlay>
    </>
  );
};
