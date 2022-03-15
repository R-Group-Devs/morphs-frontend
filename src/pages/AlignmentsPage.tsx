import { Suspense } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useConnect, useAccount } from 'wagmi';
import { Helmet } from 'react-helmet';
import SigilAlignmentTable from '../components/SigilAlignmentTable';
import LoadingIndicator from '../components/LoadingIndicator';
import Animated from '../components/Animated';
import useAlignments from '../hooks/useAlignments';
import { FONTS } from '../constants/theme';

const Description = styled.div`
  margin: 3.5em 0 3em;
  max-width: 600px;
  line-height: 32px;
`;

const Header = styled.div`
  margin-bottom: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 650px) {
    flex-direction: column;
    align-items: start;
  }
`;

const Heading = styled.h2`
  font-family: ${FONTS.sansSerif};
  font-size: 28px;

  @media (max-width: 650px) {
    margin-bottom: 1em;
  }
`;

const Counts = styled.div`
  display: flex;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

const Count = styled.div`
  @media (max-width: 450px) {
    margin-bottom: 0.5em;
  }

  &:last-child {
    margin-left: 2em;
  }

  @media (max-width: 450px) {
    &:last-child {
      margin-left: 0;
    }
  }
`;

const CountLabel = styled.span`
  margin-right: 0.5em;
  font-weight: 700;

  &:after {
    content: ':';
    display: inline;
  }
`;

const Alignments = () => {
  const [{ data: wallet }] = useConnect();
  const [{ data: account }] = useAccount();
  const { data } = useAlignments();

  const alignedCount = data?.reduce((total, { count }) => total + count, 0) || 0;
  const unalignedCount = 26814 - alignedCount;

  return (
    <Animated>
      <Description>
        <p>
          The Alignments database tracks info about the Sigil Alignments of certain Morphs. The
          Playgrounds Research team is still determining the purpose of these Sigils...
        </p>

        <p>
          You can set a Sigil for a Morph you own on the token details page via{' '}
          <Link to={wallet?.connected ? `/address/${account?.address}` : '/connect'}>
            {' '}
            My Morphs
          </Link>
          .
        </p>
      </Description>

      <Header>
        <Heading>Alignments </Heading>

        <Counts>
          <Count>
            <CountLabel>🔰 Aligned</CountLabel>
            {alignedCount.toLocaleString()}
          </Count>

          <Count>
            <CountLabel>⭕️ Unaligned</CountLabel>
            {unalignedCount.toLocaleString()}
          </Count>
        </Counts>
      </Header>

      <SigilAlignmentTable alignments={data || []} />
    </Animated>
  );
};

export default () => (
  <>
    <Helmet>
      <title>Alignments</title>
    </Helmet>

    <Suspense fallback={<LoadingIndicator />}>
      <Alignments />
    </Suspense>
  </>
);
