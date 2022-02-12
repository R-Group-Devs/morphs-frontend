import { useNetwork } from 'wagmi';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Credits from './Credits';
import morphsShapesImage from '../assets/images/morphs-shapes.png';
import {
  PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES,
  MORPHS_NFT_CONTRACT_ADDRESSES,
} from '../constants/contracts';
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

export default () => {
  const [{ data: network }] = useNetwork();

  const chainId =
    network?.chain?.id && network?.chain?.id in PLAYGROUNDS_GENESIS_ENGINE_CONTRACT_ADDRESSES
      ? network?.chain?.id
      : // TODO: use mainnet fallback
        4;

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

      {!isSmallViewport && <Credits />}
    </Container>
  );
};
