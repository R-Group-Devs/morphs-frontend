import styled from 'styled-components';
import { COLORS, FONTS } from '../constants/theme';

const Container = styled.div`
  font-family: ${FONTS.sansSerif};
  font-size: 64px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.2em;
  color: ${COLORS.white};

  @media (max-width: 580px) {
    margin-top: 0.75em;
    font-size: 46px;
  }
`;

export default () => <Container>Morphs</Container>;
