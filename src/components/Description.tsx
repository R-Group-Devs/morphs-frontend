import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Credits from './Credits';
import morphsShapesImage from '../assets/images/morphs-shapes.png';
import { FONTS } from '../constants/theme';

const Container = styled.div``;

const Heading = styled.div`
  margin-top: 4em;
  font-family: ${FONTS.glyphs};
  font-size: 14px;
  font-weight: normal;
  line-height: 2em;

  @media (max-width: 767px) {
    margin-top: 3em;
  }
`;

const MorphsShapesVideo = styled.video`
  width: 60%;
  height: auto;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const FlavorText = styled.div`
  margin-top: 2.5em;
  font-size: 16px;
  line-height: 2em;

  @media (max-width: 767px) {
    margin-top: 2em;
  }
`;

export default () => {
  const isSmallViewport = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <Container>
      <MorphsShapesVideo
        src="./videos/morphs-shapes.mp4"
        autoPlay
        loop
        muted
        playsInline
        controlsList="nodownload"
        poster={morphsShapesImage}
      />

      <Heading>Our scrolls have been sent.</Heading>

      <FlavorText>
        <p>Morphs is an open-ended, evolving NFT project set in a science fantasy universe.</p>

        <p>
          Minting has ended, but you can still get involved by acquiring a scroll on the secondary
          market.
        </p>

        <p>
          Visit{' '}
          <a href="https://codex.morphs.wtf" target="_blank" rel="noreferrer">
            codex.morphs.wtf
          </a>{' '}
          for more info.
        </p>
      </FlavorText>

      <Heading>What mysteries do they hold…</Heading>

      {!isSmallViewport && <Credits />}
    </Container>
  );
};
