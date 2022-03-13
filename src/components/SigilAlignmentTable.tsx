import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
`;

const Heading = styled.th`
  border-bottom: 1px solid #e5e5e5;
`;

export default () => {
  return (
    <Table>
      <thead>
        <tr>
          <Heading>Sigil</Heading>
          <Heading>Count</Heading>
          <Heading>%</Heading>
        </tr>
      </thead>
    </Table>
  );
};
