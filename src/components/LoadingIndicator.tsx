import styled from 'styled-components';
import RingLoader from 'react-spinners/RingLoader';
import { COLORS } from '../constants/theme';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12em;
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 14em;
  pointer-events: none;
`;

export default ({ ...rest }) => {
  return (
    <Container {...rest}>
      <RingLoader color={COLORS.white} />
    </Container>
  );
};
