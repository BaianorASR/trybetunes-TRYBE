import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
--dark: #2e3440;
--grey1: #3b4252;
--grey2: #434c5e;
--grey3: #4c566a;

--white3: #d8dee9;
--white2: #e5e9f0;
--white1: #eceff4;

--bege: #8fbcbb;
--light-blue: #88c0d0;
--blue2: #81a1c1;
--blue: #5e81ac;

--red: #bf616a;
--orange: #d08770;
--yellow: #ebcb8b;
--green: #a3be8c;
--rose: #b48ead;
}

  * {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  outline: none;
  border: 0px;
    font-family: Roboto, sans-serif;
  }

  body{
    margin:0;
    padding:0;
    overflow-x: hidden;
    background-color: var(--white1);
  } 

`;

export default GlobalStyle;
