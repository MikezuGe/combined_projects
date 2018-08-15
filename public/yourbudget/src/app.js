import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';
import styled from 'styled-components';

import { Header, Sidebar, } from 'layout';
import { Home, Budget, Settings, } from 'containers';
import { ActionModal, } from 'components';
import 'style.css';


const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 10% 90%;
  grid-template-rows: 15% 85%;
  grid-template-areas:
    "header header"
    "sidebar main";
`;


const Wrapper = styled.div`
  grid-area: main;
  background: blue;
`;


const MainRouter = () => {
  return (
    <Wrapper>
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/budget' component={Budget} />
        <Route path='/settings' component={Settings} />
        <Redirect to='/home' />
      </Switch>
    </Wrapper>
  );
}


const App = () => {
  return (
    <Container>
      <Header />
      <Sidebar />
      {<MainRouter />}
      <ActionModal />
    </Container>
  );
}


ReactDOM.render(
  <BrowserRouter basename={'yourbudget'}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
