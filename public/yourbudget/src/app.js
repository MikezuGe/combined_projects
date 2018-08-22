import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';
import styled from 'styled-components';

import { Header, Sidebar, } from 'layout';
import { Home, Budget, Settings, } from 'containers';
import { Modal, Toaster, } from 'components';
import 'style.css';


const Wrapper = styled.div`
  grid-area: main;
  background: blue;
`;


const MainRouter = () => (
  <Wrapper>
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/budget' component={Budget} />
      <Route path='/settings' component={Settings} />
      <Redirect to='/home' />
    </Switch>
  </Wrapper>
);


const App = () => (
  <BrowserRouter basename={'/yourbudget'}>
    <React.Fragment>
      <Header />
      <Sidebar />
      <MainRouter />
      <Modal />
      <Toaster />
    </React.Fragment>
  </BrowserRouter>
);



ReactDOM.render(
    <App />,
  document.getElementById('root')
);
