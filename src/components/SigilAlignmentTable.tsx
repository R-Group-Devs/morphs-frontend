import { useCallback } from 'react';
import styled from 'styled-components';
import { SigilStanding } from '../lib/sigils';
import { FONTS } from '../constants/theme';

interface Props {
  alignments: SigilStanding[];
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Heading = styled.th`
  padding: 1em 0 0.75em;
  font-family: ${FONTS.sansSerif};
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;
`;

const CountHeading = styled(Heading)`
  text-align: right;
`;

const PercentageHeading = styled(Heading)`
  text-align: right;
`;

const Cell = styled.td`
  padding: 1em 0 0.25em;
`;

const CountCell = styled(Cell)`
  text-align: right;
`;

const PercentageCell = styled(Cell)`
  text-align: right;
`;

export default ({ alignments }: Props) => {
  const totalSigils = alignments.reduce((total, { count }) => total + count, 0);

  const getPercentage = useCallback(
    (count) => {
      const percentage = (count / totalSigils) * 100;

      return percentage < 0.1 ? '< 0.1' : percentage.toFixed(1);
    },
    [totalSigils]
  );

  return (
    <Table>
      <thead>
        <tr>
          <Heading>Sigil</Heading>
          <CountHeading>Count</CountHeading>
          <PercentageHeading>%</PercentageHeading>
        </tr>
      </thead>

      <tbody>
        {alignments.map(({ normalizedSigil, count }) => (
          <tr key={normalizedSigil}>
            <Cell>{normalizedSigil}</Cell>
            <CountCell>{count}</CountCell>
            <PercentageCell>{`${getPercentage(count)}%`}</PercentageCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
