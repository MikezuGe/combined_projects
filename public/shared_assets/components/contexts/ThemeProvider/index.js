import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider as StyledComponentThemeProvider, } from 'styled-components';


const production = window.location.origin !== 'http://localhost:3000';
const ColorPicker = () => {
  const SingleColor = styled.div`
  width: 50px;
  height: 50px;
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
${({ globalStyle, }) => globalStyle}
`;


const theme = {
  default: {
    primaryColor: '#1ed2f4',
    secondaryColor: '#f4f5f6',
    tertiaryColor: '#eafc40',
    quaternaryColor: '#254558',
    quinaryColor: '#2b2b3a',
    button: {
      active: `
      `,
      disabled: `
      `,
    }
  }
};


export default class ThemeProvider extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    globalStyle: PropTypes.string,
  }

  state = {
    active: 'default',
  }

  changeTheme = theme => this.setState({ active: theme, })

  render () {
    const { children, globalStyle, } = this.props;
    return (
      <React.Fragment>
        <GlobalStyle globalStyle={globalStyle} />
        <StyledComponentThemeProvider
          theme={{
            ...theme[this.state.active],
            changeTheme: this.changeTheme,
          }}
        >
          <React.Fragment>
            {children}
            {!production && <ColorPicker />}
          </React.Fragment>
        </StyledComponentThemeProvider>
      </React.Fragment>
    )
  }

}
