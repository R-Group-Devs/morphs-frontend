import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS, FONTS } from '../constants/theme';

const Logo = styled(Link)`
  display: block;
  font-family: ${FONTS.sansSerif};
  font-size: 64px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.2em;
  color: ${COLORS.white};
  border: none;

  &:hover {
    color: inherit;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 580px) {
    margin-top: 0.5em;
    font-size: 54px;
  }
`;

export default ({ ...rest }) => (
  <Logo to="/" {...rest}>
    Morphs
  </Logo>
);
