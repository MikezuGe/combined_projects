import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';
import { injectGlobal, } from 'styled-components';

import { Toaster, Modal, } from './components/organisms';
import {
  Home,
  Budget,
  Settings,
} from './containers';


injectGlobal`
* {
  font-family: 'Ubuntu', sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /*
  color: white;
  text-shadow: 2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px #000, -1px 1px #000, 1px -1px #000;
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


const App = () => (
  <BrowserRouter basename={'/yourbudget'}>
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/budget' component={Budget} />
      <Route path='/settings' component={Settings} />
      <Redirect to='/home' />
    </Switch>
  </BrowserRouter>
);



ReactDOM.render(
  <React.Fragment>
    <App />
    <Modal />
    <Toaster />
  </React.Fragment>,
  document.getElementById('root')
);
