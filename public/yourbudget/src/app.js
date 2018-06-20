import React, { Component, } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, history, Switch, Route, Redirect, } from 'react-router-dom';
import { Provider, connect, } from 'react-redux';

import './style.css';

import { Menu, Header, SideMenu, ActionModal, } from './layout';
import { Login, Home, Budget, Options, Profile, } from './containers';
import store from './stores';


let MainContent = class MainContent extends Component {

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
    const {
      closeActionModal, openActionModal, toggleContainerAction,
      props: { loading, sessionId, location: { pathname, }, },
      state: { actionModalOpen, actionModalFormType, containerActionType, },
    } = this;
    if (loading) { return; }
    return sessionId === '' && pathname !== '/login'
      ? <Redirect to='/login' />
      : <Switch>
        { actionModalOpen &&
          <ActionModal actionModalFormType={actionModalFormType} closeActionModal={closeActionModal} /> }
        { sessionId === '' &&
          <Route exact path='/login' component={Login} /> }
        <Route exact path='/' component={Menu} />
        <Route path='/'>
          <div className={'maincontent'}>
            <Header />
            <SideMenu pathname={pathname} openActionModal={openActionModal} toggleContainerAction={toggleContainerAction} />
            <Switch>
              <Route path='/home' render={() => <Home />} />
              <Route path='/budget' render={() => <Budget containerActionType={containerActionType} />} />
              <Route path='/options' render={() => <Options />} />
              <Route path='/profile' render={() => <Profile />} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </Route>
        <Redirect from='*' to='/' />
      </Switch>;
  }

}


MainContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  loading: state.authStore.loading,
  sessionId: state.authStore.sessionId,
});


MainContent = connect(mapStateToProps, null)(MainContent);


class App extends Component {

  render () {
    return <Route path='/' component={MainContent} />;
  }

}


const { pathname, } = window.location;
const slashPos = pathname.indexOf('/', 1);
const base = (() => slashPos < 0 ? pathname : pathname.slice(0, slashPos))();


ReactDOM.render(
  <Provider store={store}>
    <Router basename={base} history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
