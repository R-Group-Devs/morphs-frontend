import { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingIndicator from '../components/LoadingIndicator';
import GalleryItem from '../components/GalleryItem';
import useAlignments from '../hooks/useAlignments';
import useMorphs from '../hooks/useMorphs';
import { MorphsMetadata } from '../lib/morphs';
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

const LoadMoreIndicator = styled(LoadingIndicator)`
  margin: 2em 0 3em;
`;

const MorphsByAlignment = () => {
  const { sigil } = useParams();
  const { data: alignments } = useAlignments();
  const [morphs, setMorphs] = useState<any[]>([]);

  const alignment = alignments?.find(
    ({ normalizedSigil }) => sigil?.toUpperCase() === normalizedSigil
  );

  const [cursor, setCursor] = useState('0');
  //const { data } = useMorphs({ sigils: alignment?.sigils, cursor });
  const { data, isLoading } = useMorphs({ cursor });

  const mountAnimationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  useEffect(() => {
    setMorphs((morphs) => [...morphs, ...(data?.morphs || [])]);
  }, [data?.morphs]);

  console.log(morphs);

  if (isLoading && morphs.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <animated.div style={mountAnimationProps}>
      <Header>
        <Avatar src={data?.morphs?.[0].image} />
        <Name>{alignment?.normalizedSigil}</Name>
      </Header>

      {morphs.length ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            if (data?.nextCursor && !isLoading) {
              setCursor(data.nextCursor);
            }
          }}
          hasMore
          loader={<LoadMoreIndicator />}
          threshold={2000}
        >
          <Gallery>
            {morphs.map((morph) => (
              <GalleryItem key={morph.tokenId} {...morph} />
            ))}
          </Gallery>
        </InfiniteScroll>
      ) : (
        <Empty>This wallet does not hold any morphs.</Empty>
      )}
    </animated.div>
  );
};

export default () => {
  const { sigil } = useParams();

  return (
    <>
      <Helmet>
        <title>{sigil}</title>
      </Helmet>

      <Suspense fallback={<LoadingIndicator />}>
        <MorphsByAlignment />
      </Suspense>
    </>
  );
};
