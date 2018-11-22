import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';

import { ThemeProvider, } from '../../shared_assets/components/contexts';
import { Home, Budget, Settings, } from './containers';


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
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
