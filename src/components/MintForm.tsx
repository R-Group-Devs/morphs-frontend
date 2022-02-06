import styled from 'styled-components';
import scrollExampleImage from '../assets/images/scroll-example.png';

const Container = styled.div`
  margin-left: 6em;
  width: 100%;
`;

const ScrollExampleImage = styled.img`
  margin-bottom: 2em;
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
`;

const SubmitButton = styled.button`
  padding: 25px 50px;
  width: 100%;
  min-height: 72px;
  background-color: #5b4dc8;
  font-family: 'Space Grotesk', Sans-serif;
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  color: #f8f4ec;
  border: none;
`;

const HelperText = styled.p`
  color: #f8f4ec;
  font-family: 'Space Grotesk', Sans-serif;
  font-size: 14px;
  font-weight: normal;
  line-height: 2em;
  text-align: center;
`;

export default () => (
  <Container>
    <ScrollExampleImage src={scrollExampleImage} alt="" />
    <CodeInput placeholder="If you have a special code, input it here" />
    <SubmitButton>Mint a Scroll</SubmitButton>

    <HelperText>Minting is free. You just pay gas.</HelperText>
  </Container>
);
