import { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingIndicator from '../components/LoadingIndicator';
import Animated from '../components/Animated';
import HeaderAvatar from '../components/HeaderAvatar';
import Gallery from '../components/Gallery';
import GalleryItem from '../components/GalleryItem';
import useAlignments from '../hooks/useAlignments';
import useMorphs from '../hooks/useMorphs';
import { MorphsMetadata } from '../lib/morphs';
import { FONTS } from '../constants/theme';

const Header = styled.div`
  margin-bottom: 4em;
  text-align: center;

  @media (max-width: 650px) {
    margin-bottom: 3em;
  }
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
  const [morphs, setMorphs] = useState<MorphsMetadata[]>([]);

  const alignment = alignments?.find(
    ({ normalizedSigil }) => sigil?.toUpperCase() === normalizedSigil
  );

  const [cursor, setCursor] = useState('0');
  const { data, isLoading } = useMorphs({ sigils: alignment?.sigils, cursor });

  useEffect(() => {
    setMorphs((morphs) => [...morphs, ...(data?.morphs || [])]);
  }, [data?.morphs]);

  if (isLoading && morphs.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <Animated>
      <Header>
        <HeaderAvatar src={data?.morphs?.[0].image} />
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
          hasMore={!data || !!data?.nextCursor}
          loader={<LoadMoreIndicator key={0} />}
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
    </Animated>
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
