import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useConnect, useAccount } from 'wagmi';
import { useMediaQuery } from 'react-responsive';
import MobileNav from './MobileNav';

const Nav = styled.ul`
  display: flex;
  margin-left: 70px;
  padding: 0;
  list-style: none;
  font-size: 14px;
`;

const NavItem = styled.li`
  &:after {
    content: '';
    display: inline-block;
    margin: 0 24px;
    width: 8px;
    height: 8px;
    background: #474747;
  }

  &:last-child:after {
    display: none;
  }
`;

const NavLink = styled(Link)``;

const NavLinkExternal = styled.a``;

export default () => {
  const [{ data: wallet }] = useConnect();
  const [{ data: account }] = useAccount();

  const isMediumViewport = useMediaQuery({
    query: '(max-width: 1024px)',
  });

  if (isMediumViewport) {
    return <MobileNav />;
  }

  return (
    <Nav>
      <NavItem>
        <NavLinkExternal href="https://codex.morphs.wtf" target="_blank" rel="noreferrer">
          Codex
        </NavLinkExternal>
      </NavItem>

      <NavItem>
        <NavLink to={wallet?.connected ? `/address/${account?.address}` : '/connect'}>
          My Scrolls
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/alignments">Alignments</NavLink>
      </NavItem>
    </Nav>
  );
};
