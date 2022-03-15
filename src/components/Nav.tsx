import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useConnect, useAccount } from 'wagmi';
import { COLORS } from '../constants/theme';

const Nav = styled.ul`
  display: flex;
  margin-left: 64px;
  padding: 0;
  list-style: none;
  font-size: 14px;
`;

const NavItem = styled.li`
  &:after {
    content: '';
    display: inline-block;
    margin: 0 22px;
    width: 8px;
    height: 8px;
    background: #474747;
  }

  &:last-child:after {
    display: none;
  }
`;

const NavLinkStyles = css`
  border-bottom: none;

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

  &:focus span {
    outline: 1px dotted ${COLORS.accent.normal};
  }
`;

const NavLink = styled(Link)`
  ${NavLinkStyles}
`;

const NavLinkExternal = styled.a`
  ${NavLinkStyles}
`;

export default () => {
  const [{ data: wallet }] = useConnect();
  const [{ data: account }] = useAccount();

  return (
    <Nav>
      <NavItem>
        <NavLinkExternal href="https://codex.morphs.wtf" target="_blank" rel="noreferrer">
          <span>Codex</span> 📖
        </NavLinkExternal>
      </NavItem>

      <NavItem>
        <NavLink to={wallet?.connected ? `/address/${account?.address}` : '/connect'}>
          <span>My Morphs</span> 👤
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/alignments">
          <span>Alignments</span> 🛡
        </NavLink>
      </NavItem>
    </Nav>
  );
};
