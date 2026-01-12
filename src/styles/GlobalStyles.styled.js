
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s, color 0.3s;
  }

  #root {
    margin: 0 auto;
    text-align: center;
  }

  ._hide {
    display: none;
  }

  .loading-message {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 24px;
      color: #8B8B8B;
    }

  ._hover01:hover {
    background-color: #33399b !important;
  }

  ._hover03:hover {
    background-color: #33399b !important;
    color: #FFFFFF !important;
  }

  ._btn-bor {
    border-radius: 4px;
    border: 0.7px solid var(--palette-navy-60, #565eef);
    outline: none;
    background: transparent;
    color: #565eef;
  }

  ._btn-bor a {
    color: #565eef;
  }

  ._btn-bg {
    border-radius: 4px;
    background: #565eef;
    border: none;
    outline: none;
    color: #ffffff;
  }

  ._btn-bg a {
    color: #ffffff;
  }

  ._web-design {
    background-color: #fac98dff;
    color: #ff6d00;
  }
  ._research {
    background-color: #99f5beff;
    color: #06b16e;
  }
  ._copywriting {
    background-color: #c89af8ff;
    color: #9a48f1;
  }
  ._gray {
    background: #94a6be;
    color: #ffffff;
  }
  ._active-category {
    opacity: 1 !important;
  }

  @media screen and (max-width: 495px) {
    .container {
      width: 100%;
      padding: 0 16px;
    }
  }  

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  @keyframes card-animation {
    0% { height: 0; opacity: 0; }
    100% { height: auto; opacity: 1; }
  }
`;
