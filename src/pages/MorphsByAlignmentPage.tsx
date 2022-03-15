import { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
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

const AlignmentRank = styled.h4`
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
`;

const Empty = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 12em;
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 14em;
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

  const alignmentIndex = alignments?.findIndex(
    ({ normalizedSigil }) => sigil?.toUpperCase() === normalizedSigil
  );

  const rank = alignmentIndex !== undefined ? alignmentIndex + 1 : null;

  const [cursor, setCursor] = useState('0');
  const { data, isLoading } = useMorphs({ sigils: alignment?.sigils, cursor });

  useEffect(() => {
    setMorphs((morphs) => [...morphs, ...(data?.morphs || [])]);
  }, [data?.morphs]);

  if (isLoading && (data?.morphs.length === 0 || morphs.length === 0)) {
    return <LoadingIndicator />;
  }

  if (!alignment || morphs.length === 0 || data?.morphs.length === 0) {
    return (
      <Empty>
        <p>No morphs are aligned with this sigil.</p>
        <Link to="/alignments">See all alignments</Link>
      </Empty>
    );
  }

  return (
    <Animated>
      <Header>
        <HeaderAvatar src={data?.morphs?.[0].image} />
        <Name>{alignment?.normalizedSigil}</Name>

        {rank && (
          <AlignmentRank>
            <strong>#{rank}</strong> in <Link to="/alignments">Alignments</Link>
          </AlignmentRank>
        )}
      </Header>

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
