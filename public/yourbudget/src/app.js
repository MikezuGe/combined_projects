import React, { Component, } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, history, Switch, Route, Redirect, } from 'react-router-dom';
import { Provider, connect, } from 'react-redux';

import 'css/style.css';

import { Menu, Header, SideMenu, ActionModal, } from 'js/layout';
import { Login, Home, Budget, Options, Profile, } from 'js/containers';
import store from 'js/redux';


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
      prevState.containerActionType = prevState.containerActionType === containerActionType ? '' : containerActionType;
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


let App = class App extends Component {

  render () {
    const { loading, sessionId, } = this.props;
    if (loading) {
      return;
    }
    if (sessionId === '' && pathname !== '/yourbudget/') {
      window.location = base;
    }
    return (
      <Switch>
        <Route exact path='/' component={sessionId === '' ? Login : Menu} />
        <Route path='/' component={MainContent} />
      </Switch>
    );
  }

}


App.propTypes = {
  loading: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired,
}


const mapStateToProps = state => ({
  loading: state.authStore.loading,
  sessionId: state.authStore.sessionId,
});


App = connect(mapStateToProps, null)(App);


const { pathname, } = window.location;
const base = pathname.slice(0, pathname.indexOf('/', 1));


ReactDOM.render(
  <Provider store={store}>
    <Router basename={base} history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
