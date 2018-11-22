import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider as StyledComponentThemeProvider, } from 'styled-components';


const GlobalStyle = createGlobalStyle`
* {
  font-family: 'Ubuntu', sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /*
  color: white;
  text-shadow:
    2px 0 0 #000,
    -2px 0 0 #000,
    0 2px 0 #000,
    0 -2px 0 #000,
    1px 1px #000,
    -1px -1px #000,
    -1px 1px #000,
    1px -1px #000;
  */
}

html, body {
  overflow: hidden;
}

#root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 15% 85%;
  grid-template-areas:
    "header main"
    "sidebar main";
}`;


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


/* Color picker component, only exists in development */
if (process.env.NODE_ENV !== 'production') {
  const Color = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme, color, }) => theme[`${color}Color`]}
  `;
  const ColorComponent = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    box-sizing: border-box;
    border: 1px solid black;
    z-index: 10;
  `;
  global.ColorPicker = () => (
    <ColorComponent>
      <Color color={'primary'} />
      <Color color={'secondary'} />
      <Color color={'tertiary'} />
      <Color color={'quaternary'} />
      <Color color={'quinary'} />
    </ColorComponent>
  );
}


class ThemeProvider extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  state = {
    active: 'default',
  }

  changeTheme = theme => this.setState({ active: theme, })

  render () {
    const { children, } = this.props;
    return (
      <React.Fragment>
        <StyledComponentThemeProvider theme={{
            ...theme[this.state.active],
            changeTheme: this.changeTheme,
          }}
        >
          <React.Fragment>
            {ColorPicker && <ColorPicker />}
            {children}
          </React.Fragment>
        </StyledComponentThemeProvider>
        <GlobalStyle />
      </React.Fragment>
    )
  }

}


export default ThemeProvider;
