import styled from 'styled-components';
import RingLoader from 'react-spinners/RingLoader';
import { COLORS } from '../constants/theme';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => {
  return (
    <Container>
      <RingLoader color={COLORS.white} />
    </Container>
  );
};
