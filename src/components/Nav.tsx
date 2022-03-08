import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useConnect, useAccount } from 'wagmi';

const Nav = styled.ul`
  display: inline-block;
  margin-left: 70px;
  padding: 0;
  list-style: none;

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

const NavItem = styled.li``;

const NavLink = styled(Link)`
  color: #666;
  border-bottom-color: #666;

  &:hover {
    color: #fff;
    border-bottom-color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

export default () => {
  const [{ data: wallet }] = useConnect();
  const [{ data: account }] = useAccount();

  if (!wallet.connected) {
    return null;
  }

  return (
    <Nav>
      <NavItem>
        <NavLink to={`/address/${account?.address}`}>My Scrolls</NavLink>
      </NavItem>
    </Nav>
  );
};
