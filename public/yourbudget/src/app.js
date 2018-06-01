import React, { Component, } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, history, Switch, Route, Redirect, } from 'react-router-dom';
import { Provider, } from 'react-redux';

import './css/style.css';

import { Menu, Header, SideMenu, ActionModal, } from './js/layout';
import { Home, Budget, Options, Profile, } from './js/containers';
import store from './js/redux';

/* eslint-disable */
const { pathname, } = window.location;
const base = pathname.slice(0, pathname.indexOf('/', 1));
/* eslint-enable */


class MainContent extends Component {

  state = {
    actionModalOpen: false,
    actionModalFormType: '',
    containerActionType: '',
  }

  openActionModal = actionModalFormType => {
    this.setState({
      actionModalOpen: true,
      actionModalFormType: actionModalFormType || '',
    });
  }

  toggleContainerAction = containerActionType => {
    this.setState(prevState => {
      if (prevState.containerActionType === containerActionType) {
        prevState.containerActionType = '';
      } else {
        prevState.containerActionType = containerActionType;
      }
      return prevState;
    });
  }

  closeActionModal = () => {
    this.setState({ actionModalOpen: false, });
  }

  render () {
    const { pathname, } = this.props.location;
    return (
      <div className={'maincontent'}>
        { this.state.actionModalOpen &&
          <ActionModal actionModalFormType={this.state.actionModalFormType} closeActionModal={this.closeActionModal} /> }
        <Header />
        <SideMenu pathname={pathname} openActionModal={this.openActionModal} toggleContainerAction={this.toggleContainerAction} />
        <Switch>
          <Route path='/home' render={() => <Home />} />
          <Route path='/budget' render={() => <Budget containerActionType={this.state.containerActionType} />} />
          <Route path='/options' render={() => <Options />} />
          <Route path='/profile' render={() => <Profile />} />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }

}


MainContent.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};


class App extends Component {

  render () {
    return (
      <Switch>
        <Route exact path='/' component={Menu} />
        <Route path='/' component={MainContent} />
      </Switch>
    );
  }

}


ReactDOM.render(
  <Provider store={store}>
    <Router basename={base} history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
