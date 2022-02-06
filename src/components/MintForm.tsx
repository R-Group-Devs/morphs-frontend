import styled from 'styled-components';
import useMint from '../hooks/useMint';
import { TRANSACTION_STATES } from '../hooks/useExecuteTransaction';
import scrollExampleImage from '../assets/images/scroll-example.png';

const Container = styled.div`
  margin-left: 22%;
  width: 100%;

  @media (max-width: 767px) {
    margin-top: 2em;
    margin-left: 0;
  }
`;

const ScrollExampleImage = styled.img`
  margin-top: -0.5em;
  margin-bottom: 1.75em;
  width: 100%;
  height: auto;
  border: 1px solid #f8f4ec;
`;

const CodeInput = styled.input`
  margin-bottom: 1em;
  padding: 4px 12px;
  width: 100%;
  min-height: 33px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: normal;
  line-height: 2em;
  text-align: center;
  color: #1a1a1a;
  background: #d8d8d8;
  border: none;
  border-radius: 2px;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 20px 50px;
  width: 100%;
  min-height: 72px;
  background: #5b4dc8;
  font-family: 'Space Grotesk', Sans-serif;
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  color: #f8f4ec;
  border: none;
  transition: all 0.3s;

  &:hover {
    background: #7265d7;
    color: #fff;
    cursor: pointer;
  }

  &:disabled,
  &[disabled] {
    background: #5b4dc8;
    color: #f8f4ec;
    opacity: 0.6;
    cursor: default;
  }
`;

const HelperText = styled.p`
  margin-top: 0.5em;
  color: #f8f4ec;
  font-family: 'Space Grotesk', Sans-serif;
  font-size: 14px;
  font-weight: normal;
  line-height: 2em;
  text-align: center;
`;

const BUTTON_TEXT = {
  [TRANSACTION_STATES.IDLE]: 'Mint a Scroll',
  [TRANSACTION_STATES.AWAITING_SIGNATURE]: 'Mint a Scroll...',
  [TRANSACTION_STATES.AWAITING_CONFIRMATION]: 'Minting a Scroll...',
  [TRANSACTION_STATES.CONFIRMED]: 'Minted!',
};

export default () => {
  const [{ state }, mint] = useMint();

  // TODO: check input code
  const isCodeValid = false;

  return (
    <Container>
      <ScrollExampleImage src={scrollExampleImage} alt="" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mint(isCodeValid);
        }}
      >
        <CodeInput placeholder="If you have a special code, input it here" />
        <SubmitButton
          disabled={
            state === TRANSACTION_STATES.AWAITING_SIGNATURE ||
            state === TRANSACTION_STATES.AWAITING_CONFIRMATION
          }
        >
          {BUTTON_TEXT[state]}
        </SubmitButton>
      </form>

      <HelperText>Minting is free. You just pay gas.</HelperText>
    </Container>
  );
};
