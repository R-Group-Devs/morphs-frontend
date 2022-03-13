import styled from 'styled-components';

const Credits = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4em;
  padding: 0;
  list-style: none;
  font-size: 12px;
  font-weight: normal;
  line-height: 1em;
  text-transform: lowercase;

  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: 3em;
    font-size: 12px;
    text-align: center;
  }
`;

const Credit = styled.li`
  margin-bottom: 1.25em;

  &:after {
    margin: 0 8px;
    content: '⋅';
    display: inline-block;

    @media (max-width: 767px) {
      display: none;
    }
  }

  &:last-child:after {
    display: none;
  }
`;

export default () => (
  <Credits>
    <Credit>
      Built by{' '}
      <a href="https://playgrounds.wtf" target="_blank" rel="noreferrer">
        playgrounds.wtf
      </a>
    </Credit>
    <Credit>
      Designed by{' '}
      <a href="https://twitter.com/polyforms_" target="_blank" rel="noreferrer">
        @polyforms_
      </a>
    </Credit>
    <Credit>
      Made with{' '}
      <a href="https://heyshell.xyz" target="_blank" rel="noreferrer">
        heyshell.xyz
      </a>
    </Credit>
  </Credits>
);
