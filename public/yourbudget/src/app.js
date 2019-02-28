import React, { useContext, } from 'react'; 
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';

import { ThemeProvider, ToasterProvider, ModalProvider, AuthContext, AuthProvider, } from '../../shared_assets/components/contexts';
import { Home, Budget, Graph, Settings, } from './containers';


const globalStyle = ({ theme, }) => `
* {
  font-family: 'Ubuntu', sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
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
  ${theme.breakpoints([ 'xs', 'sm', ], `
  grid-template-columns: 0% 100%;
  grid-template-rows: 0% 100%;
  `)}
  grid-template-areas:
    "header main"
    "sidebar main";
}
`;


const App = () => {
  const { isLogged, username, } = useContext(AuthContext);
  return (
    <BrowserRouter basename={'/yourbudget'}>
      <Switch>
        <Route
          path='/home'
          component={Home}
        />
        {isLogged && (
          <Route
            path='/budget'
            component={Budget}
          />
        )}
        {isLogged && (
          <Route
            path='/graph'
            component={Graph}
          />
        )}
        {isLogged && (
          <Route
            path='/settings'
            component={Settings}
          />
        )}
        <Redirect to='/home' />
      </Switch>
    </BrowserRouter>
  );
};


ReactDOM.render(
  <AuthProvider>
    <ThemeProvider globalStyle={globalStyle}>
      <ToasterProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ToasterProvider>
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById('root')
);
