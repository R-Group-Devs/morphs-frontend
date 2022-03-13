import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Credits from './Credits';
import morphsShapesImage from '../assets/images/morphs-shapes.png';
import { FONTS } from '../constants/theme';

const Container = styled.div``;

const Heading = styled.div`
  margin-top: 32px;
  font-family: ${FONTS.sansSerif};
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
`;

const MorphsShapesVideo = styled.video`
  width: 70%;
  height: auto;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const FlavorText = styled.div`
  margin-top: 32px;
  font-size: 16px;
  font-weight: 700;
  line-height: 2em;

  @media (max-width: 767px) {
    margin-top: 2em;
  }
`;

const BodyText = styled.div`
  margin-top: 32px;
  font-size: 16px;
  line-height: 2em;
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

      <Heading>
        Welcome to
        <br />
        The Morphs Research Hub.
      </Heading>

      <FlavorText>
        <p>Morphs is an open-ended, evolving NFT project set in a science fantasy universe.</p>
      </FlavorText>

      <BodyText>
        <p>
          To learn more about Morphs, visit the{' '}
          <a href="https://codex.morphs.wtf" target="_blank" rel="noreferrer">
            Codex
          </a>
          .
        </p>

        <p>
          To view your own or all Morphs NFTs, visit the <Link to="">Compendium</Link>.
        </p>

        <p>
          To view the data on Sigil Alignments, visit <Link to="/alignments">Alignments</Link>.
        </p>
      </BodyText>
    </Container>
  );
};
