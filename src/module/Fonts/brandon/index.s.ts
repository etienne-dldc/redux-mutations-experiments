import { injectGlobal } from 'styled-components';

// tslint:disable:no-var-requires
const boldWoff = require('./brandon_bld-webfont.woff');
const boldWoff2 = require('./brandon_bld-webfont.woff2');
const blackWoff = require('./brandon_blk-webfont.woff');
const blackWoff2 = require('./brandon_blk-webfont.woff2');
const mediumWoff = require('./brandon_med-webfont.woff');
const mediumWoff2 = require('./brandon_med-webfont.woff2');
const mediumItalicWoff = require('./brandon_med_it-webfont.woff');
const mediumItalicWoff2 = require('./brandon_med_it-webfont.woff2');
const regularWoff = require('./brandon_reg-webfont.woff');
const regularWoff2 = require('./brandon_reg-webfont.woff2');
const regularItalicWoff = require('./brandon_reg_it-webfont.woff');
const regularItalicWoff2 = require('./brandon_reg_it-webfont.woff2');
// tslint:enable:no-var-requires

// tslint:disable-next-line:no-unused-expression
injectGlobal`

/*! Generated by Font Squirrel (https://www.fontsquirrel.com) on December 2, 2017 */

@font-face {
    font-family: 'Brandon Grotesque';
    src: url(${boldWoff2}) format('woff2'),
         url(${boldWoff}) format('woff');
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: 'Brandon Grotesque';
    src: url(${blackWoff2}) format('woff2'),
         url(${blackWoff}) format('woff');
    font-weight: 900;
    font-style: normal;
}

@font-face {
    font-family: 'Brandon Grotesque';
    src: url(${mediumWoff2}) format('woff2'),
         url(${mediumWoff}) format('woff');
    font-weight: 500;
    font-style: italic;
}

@font-face {
    font-family: 'Brandon Grotesque';
    src: url(${mediumItalicWoff2}) format('woff2'),
         url(${mediumItalicWoff}) format('woff');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'Brandon Grotesque';
    src: url(${regularWoff2}) format('woff2'),
         url(${regularWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'Brandon Grotesque';
    src: url(${regularItalicWoff2}) format('woff2'),
         url(${regularItalicWoff}) format('woff');
    font-weight: 400;
    font-style: italic;
}
`;
