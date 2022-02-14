import styled, { keyframes } from 'styled-components';

const ellipsis = keyframes`
  to {
    width: 2.1em;
  }
`;

export default styled.span`
  display: block;

  &:after {
    content: '...';
    margin-left: 0.1em;
    width: 0;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4, end) 900ms infinite;
    overflow: hidden;
  }
`;
