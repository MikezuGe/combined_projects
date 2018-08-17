import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';
import styled from 'styled-components';

import { Header, Sidebar, } from 'layout';
import { Home, Budget, Settings, } from 'containers';
import { Modal, } from 'components';
import 'style.css';


const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 10% 90%;
  grid-template-rows: 15% 85%;
  grid-template-areas:
    "header main"
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


class App extends React.Component {

  state = {
    modalActive: false,
    modalForm: null,
  }

  openModal = form => {
    this.setState({ modalActive: true, modalForm: form, });
  }

  closeModal = () => {
    this.setState({ modalActive: false, modalForm: null, });
  }

  render() {
    return (
      <BrowserRouter basename={'yourbudget'}>
        <Container>
          <Header />
          <Sidebar openModal={this.openModal} />
          <MainRouter />
          <Modal active={this.state.modalActive} form={this.state.modalForm} close={this.closeModal} />
          { /*<Toaster />*/ }
        </Container>
      </BrowserRouter>
    );
  }

}


ReactDOM.render(
    <App />,
  document.getElementById('root')
);
