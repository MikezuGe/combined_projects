import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';

import ThemeProvider from './components/ThemeProvider';
import { ToasterContextProvider, ModalContextProvider, } from './components/contexts';
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
    <ToasterContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </ToasterContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
