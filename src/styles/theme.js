import React, { Component } from "react";

import styled, { ThemeProvider, injectGlobal } from "styled-components";
import theme from "../themes/default";
import GlobalStyles from './globals';

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default Theme;