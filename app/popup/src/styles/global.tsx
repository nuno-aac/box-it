/**
 * Module dependencies
 */
import { createGlobalStyle } from 'styled-components';
 
/**
 * Export `GlobalStyle`.
 */

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background: #444444;
    color: ivory;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    margin: 0;
    padding: 0;
    width: max-content;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Satisfy', cursive;
    margin: 0;
  }
`;
 