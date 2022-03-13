import { Suspense } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { Helmet } from 'react-helmet';
import LoadingIndicator from '../components/LoadingIndicator';
import GalleryItem from '../components/GalleryItem';
import useAlignments from '../hooks/useAlignments';
import useMorphs from '../hooks/useMorphs';
import { COLORS, FONTS } from '../constants/theme';

const Gallery = styled.ul`
  margin-bottom: 5em;
  padding: 0;
  display: flex;
  gap: 1.5em;
  flex-wrap: wrap;
  list-style: none;
`;

const Header = styled.div`
  margin-bottom: 4em;
  text-align: center;
`;

const Avatar = styled.img`
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 1px solid ${COLORS.white};
  border-radius: 50%;
`;

const Name = styled.h2`
  margin-bottom: 0;
  font-family: ${FONTS.sansSerif};
  font-size: 32px;
`;

const Empty = styled.div`
  margin-top: 6em;
  text-align: center;
`;

const Compendium = () => {
  const { sigil } = useParams();
  const { data: alignments } = useAlignments();
  const alignment = alignments?.find(
    ({ normalizedSigil }) => sigil?.toUpperCase() === normalizedSigil
  );
  const { data } = useMorphs({ sigils: alignment?.sigils });

  const mountAnimationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <animated.div style={mountAnimationProps}>
      <Header>
        <Avatar src={data?.morphs?.[0].image} />
        <Name>{alignment?.normalizedSigil}</Name>
      </Header>

      {data?.morphs.length ? (
        <Gallery>
          {data?.morphs.map((morph) => (
            <GalleryItem key={morph.tokenId} {...morph} />
          ))}
        </Gallery>
      ) : (
        <Empty>This wallet does not hold any morphs.</Empty>
      )}
    </animated.div>
  );
};

export default () => (
  <>
    <Helmet>
      <title>Compendium</title>
    </Helmet>

    <Suspense fallback={<LoadingIndicator />}>
      <Compendium />
    </Suspense>
  </>
);
