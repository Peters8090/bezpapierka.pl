import React from 'react';
import {css, Global} from '@emotion/core';

export const GlobalStyle = () => <Global styles={css`
/* Material UI */
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Logo */
@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap');

/* LoginPage */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');

/* ContactPage */
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

*::selection {
  background: #b3d4fc;
}

a {
  text-decoration: none;
  color: unset;
}

p {
  white-space: pre-line;
}
`}/>;