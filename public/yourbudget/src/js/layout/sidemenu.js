import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';

import '../../css/layout/sidemenu.css';

import { addBudget, removeBudget, } from '../redux/';
import { modalFormTypes, } from '../modalforms';


const firstLetterToUpperCase = word => word.charAt(0).toUpperCase() + word.slice(1);


class SideMenu extends Component {

  getSideMenuItemList = () => {
    const { pathname, openActionModal, } = this.props;
    const secondSlashIndex = pathname.indexOf('/', 1);
    const path = pathname.slice(1, secondSlashIndex < 0
      ? pathname.length
      : secondSlashIndex);
    const items = [];
    switch (path) {
    case 'home':
      items.push(<div key={items.length} className={'sidemenutitle'}>{firstLetterToUpperCase(path)}</div>);
      break;
    case 'budget':
      items.push(<div key={items.length} className={'sidemenutitle'}>{firstLetterToUpperCase(path)}</div>);
      items.push(<div key={items.length} className={'sidemenuitem'} onClick={() => openActionModal(modalFormTypes.budgetAddModalForm)}>{'Add'}</div>);
      break;
    case 'options':
      items.push(<div key={items.length} className={'sidemenutitle'}>{firstLetterToUpperCase(path)}</div>);
      break;
    case 'profile':
      items.push(<div key={items.length} className={'sidemenutitle'}>{firstLetterToUpperCase(path)}</div>);
      break;
    default:
      throw new Error(`Sidemenuitems rendering failed, unknown location: ${path}`);
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
  addBudget: PropTypes.func.isRequired,
  removeBudget: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  loading: state.budgetStore.loading,
});

const mapDispatchToProps = dispatch => ({
  addBudget: budget => dispatch(addBudget(budget)),
  removeBudget: id => dispatch(removeBudget(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
