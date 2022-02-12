import styled from 'styled-components';

const Credits = styled.ul`
  margin-top: 4em;
  padding: 0;
  list-style: none;
  font-size: 14px;
  font-weight: normal;
  line-height: 1em;

  @media (max-width: 767px) {
    margin-top: 3em;
    font-size: 12px;
    text-align: center;
  }
`;

const Credit = styled.li`
  margin-bottom: 1.25em;
`;

export default () => (
  <Credits>
    <Credit>
      built by{' '}
      <a href="https://playgrounds.wtf" target="_blank" rel="noreferrer">
        playgrounds.wtf
      </a>
    </Credit>
    <Credit>
      designed by{' '}
      <a href="https://twitter.com/polyforms_" target="_blank" rel="noreferrer">
        @polyforms_
      </a>
    </Credit>
    <Credit>
      made with{' '}
      <a href="https://heyshell.xyz" target="_blank" rel="noreferrer">
        heyshell.xyz
      </a>
    </Credit>
  </Credits>
);
