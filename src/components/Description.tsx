import styled from 'styled-components';
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

const GalleryLink = styled.p`
  margin-top: 3em;
  font-size: 14px;
`;

const Credits = styled.ul`
  margin-top: 4em;
  padding: 0;
  list-style: none;
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
    <MorphsShapesVideo
      src="./videos/morphs-shapes.mp4"
      autoPlay
      loop
      muted
      playsInline
      controlsList="nodownload"
      poster={morphsShapesImage}
    />

    <Heading>Mint a scroll, see what happens…</Heading>
    <FlavorText>
      <p>
        Drifting through the immateria you find a scroll. You sense something mysterious, cosmic.
      </p>

      <p>You feel compelled to take it. After all, what have you got to lose…</p>

      <GalleryLink>
        {/* TODO: replace w/ NFT contract address */}
        <a
          href="https://rarible.com/collection/0x9c724d794940d94139fd32eff6606827c6c75fa0"
          target="_blank"
          rel="noreferrer"
        >
          See the scrolls of those who came before →
        </a>
      </GalleryLink>
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
