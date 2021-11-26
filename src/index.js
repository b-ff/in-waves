import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import {App} from './components/App';

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    font-size: 16px;
    color: #fff;
    background-color: #111;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3 {
    font-weight: 500;
    margin: 0;
    padding: 0.5em 0;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);