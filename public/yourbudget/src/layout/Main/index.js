import React from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import styled from 'styled-components';

import { Home, Budget, Settings, } from '../../containers';


const Wrapper = styled.div`
grid-area: main;
background: lightgray;`;


const Main = () => (
  <Wrapper>
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/budget' component={Budget} />
      <Route path='/settings' component={Settings} />
      <Redirect to='/home' />
    </Switch>
  </Wrapper>
);


export default Main;
