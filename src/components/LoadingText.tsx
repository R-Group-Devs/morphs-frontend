import styled, { keyframes } from 'styled-components';

const ellipsisAnimation = keyframes`
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
    animation: ${ellipsisAnimation} steps(4, end) 900ms infinite;
    overflow: hidden;
  }
`;
