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
    actionModalOpen: true,
    actionModalFormType: 'BUDGET_ADD_MODAL_FORM',
  }

  openActionModal = actionModalFormType => {
    this.setState({
      actionModalOpen: true,
      actionModalFormType: actionModalFormType || '',
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
        <SideMenu pathname={pathname} openActionModal={this.openActionModal}/>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/budget' component={Budget} />
          <Route path='/options' component={Options} />
          <Route path='/profile' component={Profile} />
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
