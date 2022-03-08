import styled from 'styled-components';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import useMorphDetails from '../hooks/useMorphDetails';
import MorphAttributes from './MorphAttributes';
import Paragraph from './Paragraph';
import { shortenAddress } from '../utils/address';
import { COLORS } from '../constants/theme';

interface Props {
  tokenId: string;
}

const Container = styled.div`
  display: flex;
  margin-top: 5em;

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
`;

const Name = styled.h2`
  margin-top: 0;
  font-size: 42px;

  @media (max-width: 767px) {
    margin-top: 1em;
  }
`;

const Description = styled(Paragraph)`
  margin-top: 2em;
`;

const Owner = styled(Paragraph)`
  margin-top: 2em;
  font-size: 14px;
`;

const Section = styled.div`
  margin-top: 3em;
  padding-top: 3em;
  border-top: 1px solid ${lighten(0.1, COLORS.black)};
`;

const SectionHeading = styled.h3`
  margin: 0;
  margin-bottom: 1.5em;
`;

export default ({ tokenId }: Props) => {
  const { data } = useMorphDetails(tokenId);
  const profileName = shortenAddress(data?.owner ?? '');

  return (
    <Container>
      <Panel>
        <Img src={data?.image} alt={data?.name} />
      </Panel>

      <Panel right>
        <Name>{data?.name}</Name>
        <Description>{data?.description}</Description>
        <Owner>
          Owned by <Link to={`/address/${data?.owner}`}>{profileName}</Link>
        </Owner>

        <Section>
          <SectionHeading>Attributes</SectionHeading>
          {data?.attributes && <MorphAttributes {...data?.attributes} />}
        </Section>
      </Panel>
    </Container>
  );
};
