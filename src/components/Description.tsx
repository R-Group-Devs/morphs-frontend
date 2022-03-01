import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { useSpring, animated } from 'react-spring';
import PrePostMintCloseRenderer from './PrePostMintCloseRenderer';
import Credits from './Credits';
import useChainId from '../hooks/useChainId';
import morphsShapesImage from '../assets/images/morphs-shapes.png';
import { MORPHS_NFT_CONTRACT_ADDRESSES } from '../constants/contracts';
import { NFT_EXPLORER_URLS } from '../constants/explorers';
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

const PreMintCloseDescription = () => {
  const chainId = useChainId();

  return (
    <>
      <Heading>Mint a scroll, see what happens…</Heading>

      <FlavorText>
        <p>
          Drifting through the immateria you find a scroll. You sense something mysterious, cosmic.
        </p>

        <p>You feel compelled to take it. After all, what have you got to lose…</p>

        <GalleryLink>
          <a
            href={`${NFT_EXPLORER_URLS[chainId]}/collection/${MORPHS_NFT_CONTRACT_ADDRESSES[chainId]}`}
            target="_blank"
            rel="noreferrer"
          >
            See the scrolls of those who came before →
          </a>
        </GalleryLink>
      </FlavorText>

      <Heading>Perhaps it will become something later on.</Heading>
    </>
  );
};

const PostMintCloseDescription = () => {
  const animationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: { duration: 2000 },
  });

  return (
    <animated.div style={animationProps}>
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
    </animated.div>
  );
};

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

      <PrePostMintCloseRenderer>
        {({ completed }) =>
          completed ? <PostMintCloseDescription /> : <PreMintCloseDescription />
        }
      </PrePostMintCloseRenderer>

      {!isSmallViewport && <Credits />}
    </Container>
  );
};
