import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

const Nav = styled.ul`
  display: flex;
  margin-left: 70px;
  padding: 0;
  list-style: none;
  font-size: 14px;

  @media (max-width: 820px) {
    margin-left: 40px;
    display: block;
  }

  @media (max-width: 790px) {
    margin-left: 40px;
    display: none;
  }

  @media (max-width: 580px) {
    margin-top: 2em;
    margin-left: 0;
    display: block;
  }
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
  const [{ data: account }] = useAccount();

  return (
    <Nav>
      <NavItem>
        <NavLinkExternal href="https://codex.morphs.wtf" target="_blank" rel="noreferrer">
          Codex
        </NavLinkExternal>
      </NavItem>

      <NavItem>
        <NavLink to={`/address/${account?.address}`}>My Scrolls</NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/alignments">Alignments</NavLink>
      </NavItem>
    </Nav>
  );
};
