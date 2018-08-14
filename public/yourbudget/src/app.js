import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';

import { Header, Sidebar, } from 'layout';
import { Home, Budget, Settings, } from 'containers';
import 'style.css';


const styles = {
  mainContainer: {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: '10% 90%',
    gridTemplateRows: '15% 85%',
    gridTemplateAreas: `
      'header header'
      'sidebar main'
    `,
  },
  main: {
    gridArea: 'main',
    background: 'blue',
  }
};


const App = () => {
  return (
    <div style={styles.mainContainer}>
      <Header />
      <Sidebar />
      <div style={styles.main}>
        <Switch>
          <Route path='/home' render={() => <Home />} />
          <Route path='/budget' render={() => <Budget />} />
          <Route path='/settings' render={() => <Settings />} />
          <Redirect to='/home' />
        </Switch>
      </div>
    </div>
  );
}


ReactDOM.render(
  <BrowserRouter basename={'yourbudget'}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
