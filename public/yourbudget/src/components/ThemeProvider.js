import React from 'react';
import PropTypes from 'prop-types';
import { injectGlobal, ThemeProvider as StyledComponentThemeProvider, } from 'styled-components';


injectGlobal`
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
    primaryColor: '#',
    secondaryColor: '#',
    tertiaryColor: '#',
    button: {
      active: `
      `,
      disabled: `
      `,
    }
  }
};


class ThemeProvider extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  state = {
    active: 'default',
  }

  changeTheme = theme => this.setState({ active: theme, })

  render () {
    return (
      <StyledComponentThemeProvider theme={{
          ...theme[this.state.active],
          changeTheme: this.changeTheme,
        }}
      >
        {this.props.children}
      </StyledComponentThemeProvider>
    )
  }

}


export default ThemeProvider;
