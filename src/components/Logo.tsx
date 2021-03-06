import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS, FONTS } from '../constants/theme';

const Logo = styled(Link)`
  display: block;
  font-family: ${FONTS.sansSerif};
  font-size: 56px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${COLORS.white};
  border: none;

  &:hover {
    color: inherit;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 650px) {
    font-size: 48px;
  }
`;

export default ({ ...rest }) => (
  <Logo to="/" {...rest}>
    Morphs
  </Logo>
);
