import styled from 'styled-components';
import RingLoader from 'react-spinners/RingLoader';
import { COLORS } from '../constants/theme';

const Container = styled.div`
  margin-top: 28%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export default () => {
  return (
    <Container>
      <RingLoader color={COLORS.white} />
    </Container>
  );
};
