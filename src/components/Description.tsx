import styled from 'styled-components';
import headShapesImage from '../assets/images/head-shapes.png';
import { FONTS } from '../constants/theme';

const Container = styled.div``;

const Heading = styled.div`
  margin-top: 5em;
  font-family: ${FONTS.glyphs};
  font-size: 14px;
  font-weight: normal;
  line-height: 2em;

  @media (max-width: 767px) {
    margin-top: 3em;
  }
`;

const HeadShapesImage = styled.img`
  width: 60%;
  height: auto;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const FlavorText = styled.div`
  margin-top: 4.5em;
  font-size: 16px;
  font-weight: normal;
  line-height: 2em;

  @media (max-width: 767px) {
    margin-top: 2em;
  }
`;

const Credits = styled.ul`
  margin-top: 5em;
  padding: 0;
  list-style: none;
  font-family: ${FONTS.sansSerifAlt};
  font-size: 14px;
  font-weight: normal;
  line-height: 1em;

  @media (max-width: 767px) {
    margin-top: 2em;
  }
`;

const Credit = styled.li`
  margin-bottom: 1.25em;
`;

export default () => (
  <Container>
    <HeadShapesImage src={headShapesImage} alt="" />
    <Heading>Mint a scroll, see what happens…</Heading>
    <FlavorText>
      <p>
        Drifting through the immateria you find a scroll. You sense something mysterious, cosmic.
      </p>

      <p>You feel compelled to take it. After all, what have you got to lose…</p>
    </FlavorText>

    <Heading>Perhaps it will become something later on.</Heading>

    <Credits>
      <Credit>
        built by{' '}
        <a href="https://playgrounds.wtf" target="_blank" rel="noreferrer">
          playgrounds.wtf
        </a>
      </Credit>
      <Credit>
        designed by{' '}
        <a href="https://twitter.com/polyforms_" target="_blank" rel="noreferrer">
          @polyforms_
        </a>
      </Credit>
      <Credit>
        made with{' '}
        <a href="https://heyshell.xyz" target="_blank" rel="noreferrer">
          heyshell.xyz
        </a>
      </Credit>
    </Credits>
  </Container>
);
