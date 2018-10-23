import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';

import ThemeProvider from './components/ThemeProvider';
import { Toaster, Modal, } from './components/organisms';
import {
  Home,
  Budget,
  Settings,
} from './containers';


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
  <ThemeProvider>
    <React.Fragment>
      <App />
      <Modal />
      <Toaster />
    </React.Fragment>
  </ThemeProvider>,
  document.getElementById('root')
);
