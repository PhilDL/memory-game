import { createGlobalStyle } from "styled-components/macro";

const GlobalStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
  font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.5;
  font-family: 'Atkinson Hyperlegible', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
}

#root {
  /*
    Create a stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the app.
  */
  isolation: isolate;
}

html {
  /*
    Silence the warning about missing Reach Dialog styles
  */
  --reach-dialog: 1;
}

html, body, #root {
  height: 100%;
}

:root {
  --color-primary: hsl(37, 98%, 54%);
  --color-primary-hover: hsla(36, 100%, 65%, 1);
  --color-white: hsl(0, 0%, 99%);
  --color-gray-100: hsl(0, 0%, 95%);
  --color-gray-blue-100: hsl(203, 28%, 79%);
  --color-gray-blue-300: hsl(203, 22%, 55%);
  --color-gray-blue-500: hsl(205, 37%, 55%);
  --color-gray-blue-700: hsl(205, 30%, 27%);
  --color-gray-blue-900: hsl(206, 45%, 15%);
  --font-size-h1: ${48 / 16}rem;
  --font-size-h2: ${32 / 16}rem;
  --font-size-h3: ${20 / 16}rem;
  --radius-size: 26px;
  --radius-size-xl: 35px;
  --gameboard-4-layout: 1fr 1fr 1fr 1fr;
  --gameboard-4-pieces-size: 118px;
  --gameboard-4-gap: 20px;
  --gameboard-6-layout: 1fr 1fr 1fr 1fr 1fr 1fr;
  --gameboard-6-pieces-size: 82px;
  --gameboard-6-gap: 16px;
}
`;

export default GlobalStyles;
