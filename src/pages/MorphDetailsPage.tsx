import { useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import { useAccount, useEnsLookup } from 'wagmi';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingIndicator from '../components/LoadingIndicator';
import Animated from '../components/Animated';
import MorphAttributes from '../components/MorphAttributes';
import UpdateSigilForm from '../components/UpdateSigilForm';
import InvalidTokenMessage from '../components/InvalidTokenMessage';
import useMorphDetails from '../hooks/useMorphDetails';
import { COLORS, FONTS } from '../constants/theme';

interface Props {
  tokenId: string;
}

const Container = styled.div`
  display: flex;
  margin-top: 5em;
  margin-bottom: 5em;

  @media (max-width: 767px) {
    margin-top: 3em;
    flex-direction: column;
  }
`;

const Panel = styled.div<{ right?: boolean }>`
  width: ${({ right }) => (right ? '58.8%' : '41.2%')};
  margin-left: ${({ right }) => (right ? '3em' : 0)};

  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid ${COLORS.white};
`;

const Name = styled.h2`
  margin-top: 0;
  font-family: ${FONTS.sansSerif};
  font-size: 42px;

  @media (max-width: 767px) {
    margin-top: 1em;
  }
`;

const Description = styled.div`
  margin-top: 2em;
  line-height: 1.5em;

  p {
    margin-bottom: 1.5em;
    overflow-wrap: break-word;
  }
`;

const Section = styled.div`
  margin-top: 3em;
  padding-top: 2.5em;
  border-top: 1px solid ${lighten(0.1, COLORS.black)};
`;

const SectionHeading = styled.h3`
  margin: 0;
  margin-bottom: 1.5em;
`;

const OwnerLink = styled.div`
  display: block;
  line-height: 23px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const MorphDetails = ({ tokenId }: Props) => {
  const [{ data: account }] = useAccount({});
  const { data, refetch } = useMorphDetails(tokenId);
  const [{ data: ens, loading: isEnsLoading }] = useEnsLookup({
    address: data?.owner,
    skip: !data?.owner,
  });
  const [isSigilFormVisible, setIsSigilFormVisible] = useState(false);

  const profileName = ens ?? data?.owner;
  const description =
    data?.description.replace(/0x\w*/, (address) => `[${address}](/address/${address})`) ?? '';

  return (
    <Animated pause={!data}>
      <Container>
        <Panel>
          <Img src={data?.image} alt={data?.name} />

          {account?.address.toLowerCase() === data?.owner.toLowerCase() && (
            <UpdateSigilForm isVisible onUpdate={refetch} />
          )}
        </Panel>

        <Panel right>
          <Name>{data?.name}</Name>
          <Description>
            <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
          </Description>
          {data?.attributes && (
            <Section>
              <SectionHeading>Attributes</SectionHeading>
              <MorphAttributes
                attributes={data?.attributes}
                isSigilFormVisible={isSigilFormVisible}
                onSigilAttributeMouseEnter={() => setIsSigilFormVisible(true)}
                onSigilAttributeMouseLeave={() => setIsSigilFormVisible(false)}
              />
            </Section>
          )}

          {!isEnsLoading && (
            <Section>
              <SectionHeading>Owner</SectionHeading>
              <OwnerLink>
                <Link to={`/address/${profileName}`}>{profileName}</Link>
              </OwnerLink>
            </Section>
          )}
        </Panel>
      </Container>
    </Animated>
  );
};

export default () => {
  const { tokenId = '' } = useParams();

  return (
    <>
      <Helmet>
        <title>{tokenId}</title>
      </Helmet>

      <ErrorBoundary fallback={<InvalidTokenMessage />}>
        <Suspense fallback={<LoadingIndicator />}>
          <MorphDetails tokenId={tokenId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
