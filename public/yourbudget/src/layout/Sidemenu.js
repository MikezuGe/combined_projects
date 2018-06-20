import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';

import { modalFormTypes, } from 'modalforms/';
import { containerActionTypes, } from 'containers/';

import { firstLetterToUpper, } from 'utility/';

import './sidemenu.css';


class SideMenu extends Component {

  getSideMenuItemList = () => {
    const { pathname, openActionModal, toggleContainerAction, } = this.props;
    const secondSlashIndex = pathname.indexOf('/', 1);
    const path = pathname.slice(1, secondSlashIndex < 0 ? pathname.length : secondSlashIndex);
    const items = [];
    switch (path) {
    case 'home':
      items.push(<div key={items.length} className={'sidemenutitle'}>{firstLetterToUpper(path)}</div>);
      break;
    case 'budget':
      items.push(<div key={items.length} className={'sidemenutitle'}>{firstLetterToUpper(path)}</div>);
      items.push(<div key={items.length} className={'sidemenuitem'} onClick={() => openActionModal(modalFormTypes.BUDGET_ADD_MODAL_FORM)}>{'Add'}</div>);
      items.push(<div key={items.length} className={'sidemenuitem'} onClick={() => toggleContainerAction(containerActionTypes.CONTAINER_ACTION_REMOVE_BUDGET_DATA)}>{'Remove'}</div>);
      break;
    case 'options':
      items.push(<div key={items.length} className={'sidemenutitle'}>{firstLetterToUpper(path)}</div>);
      break;
    case 'profile':
      items.push(<div key={items.length} className={'sidemenutitle'}>{firstLetterToUpper(path)}</div>);
      break;
    default:
      break;//throw new Error(`Sidemenuitems rendering failed, unknown location: ${path}`);
    }
    items.push(<Link key={items.length} className={'sidemenuitem'} to={'/'}>{'Back to menu!'}</Link>);
    return items;
  }

  render () {
    return (
      <div className={'sidemenu'}>
        { this.getSideMenuItemList() }
      </div>
    );
  }

}


SideMenu.propTypes = {
  pathname: PropTypes.string.isRequired,
  openActionModal: PropTypes.func.isRequired,
  toggleContainerAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  loading: state.budgetStore.loading,
});

//const mapDispatchToProps = dispatch => ({
//});


export default connect(mapStateToProps, /*mapDispatchToProps*/ null)(SideMenu);
