import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider as StyledComponentThemeProvider, } from 'styled-components';


const production = window.location.origin !== 'http://localhost:3000';


const ColorPicker = () => {
  const SingleColor = styled.div`
  width: 2em;
  height: 2em;
  background: ${({ theme, color, }) => theme[`${color}Color`]}
  `;
  const Palette = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  box-sizing: border-box;
  border: 1px solid black;
  `;
  return (
    <Palette>
      <SingleColor color={'primary'} />
      <SingleColor color={'secondary'} />
      <SingleColor color={'tertiary'} />
      <SingleColor color={'quaternary'} />
      <SingleColor color={'quinary'} />
    </Palette>
  );
};


const GlobalStyle = createGlobalStyle`
${({ globalStyle, theme, }) => `
  ${globalStyle && globalStyle({ theme, })}
  ${theme.breakpoints('xs', '*{font-size: 8px}')}
  ${theme.breakpoints('sm', '*{font-size: 10px}')}
  ${theme.breakpoints('md', '*{font-size: 12px}')}
  ${theme.breakpoints('lg', '*{font-size: 16px}')}
`}
`;


const theme = {
  default: {
    animateSlow: '500ms',
    animateNormal: '250ms',
    animateFast: '50ms',
    primaryColor: '#1ed2f4',
    secondaryColor: '#f4f5f6',
    tertiaryColor: '#eafc40',
    quaternaryColor: '#254558',
    quinaryColor: '#2b2b3a',
    breakpoints: (breakpoints, css) => {
      !Array.isArray(breakpoints) && (breakpoints = [ breakpoints, ]);
      return breakpoints.reduce((total, breakpoint) => {
        const bp = breakpoint === 'xs'
          ? '(max-width: 512px)' : breakpoint === 'sm'
            ? '(min-width: 513px) AND (max-width: 768px)' : breakpoint === 'md'
              ? '(min-width: 769px) AND (max-width: 1280px)' : breakpoint === 'lg'
                ? '(min-width: 1280px)' : null;
        total += `
    @media only screen and ${bp} {
      ${css}
    }
    `;
        return total;
      }, '');
    },
  },
};


const ThemeProvider = ({ children, globalStyle, }) => {
  const [ activeTheme, changeTheme, ] = useState('default');
  return (
    <React.Fragment>
      <StyledComponentThemeProvider
        theme={{
          ...theme[activeTheme],
          changeTheme,
        }}
      >
        <React.Fragment>
          <GlobalStyle globalStyle={globalStyle} />
          {children}
          {!production && <ColorPicker />}
        </React.Fragment>
      </StyledComponentThemeProvider>
    </React.Fragment>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
  globalStyle: PropTypes.func,
};


export default ThemeProvider;
