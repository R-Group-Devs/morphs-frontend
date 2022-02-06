import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    background-color: #1a1a1a;
    color: #f4f4ec;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #f55a76;
    border-bottom: 1px solid #f55a76;
    text-decoration: none;
    transition: all 0.2s linear;

    &:hover {
      color: #ecbacd;
      border-bottom-color: #ecbacd;
    }

    &:focus {
      outline: 1px dotted #f55a76;
    }

    &:focus:active {
      outline: none;
    }
  }

  @font-face {
    font-family: 'Morphs Glyphs';
    src: url('./fonts/Morphs-Glyphs.woff2') format('woff2'),
      url('./fonts/Morphs-Glyphs.woff') format('woff'),
      url('./fonts/Morphs-Glyphs.otf') format('otf'),
      url('./fonts/Morphs-Glyphs.ttf') format('ttf');
    font-weight: 300;
    font-style: normal;
    font-display: block;
  }
`;
