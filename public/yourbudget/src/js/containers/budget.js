import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { removeBudget, getBudget, } from 'redux/';

import 'css/containers/common.css';
import 'css/containers/budget.css';

import firstLetterToUpperCase from 'js/utility/firstlettertouppercase';


export const CONTAINER_ACTION_REMOVE_BUDGET_DATA = 'CONTAINER_ACTION_REMOVE_BUDGET_DATA';


const getTitles = data => Object.keys(data)
  .filter(key => ![ '_id', 'dateAdded', 'isIncome', ].includes(key))
  .map(key => firstLetterToUpperCase(key.replace(/[^A-Za-zåäö]/gi, '')));


class Budget extends Component {

  static getDerivedStateFromProps = (props, state) => ({ ...state, removeEnabled: props.containerActionType === CONTAINER_ACTION_REMOVE_BUDGET_DATA });

  state = {
    removeEnabled: false,
  }

  componentDidMount = () => {
    if (this.props.data.length <= 0) {
      this.props.getBudget();
    }
  }
  
  renderBudgetData = () => {
    const { props: { data, removeBudget, }, state: { removeEnabled, }, } = this;
    const titles = getTitles(data[0]);
    const keys = Object.keys(data[0]).filter(key => ![ '_id', 'dateAdded', 'isIncome', ].includes(key));
    return [
      // Titlerow
      <div key={'fr'} className={'budgetrow budgetrowtitle'}>
        { titles.map(title => <div key={title} className={'budgetcell budgetcelltitle'}>{title}</div>) }
        { removeEnabled && <div key={'remove'} className={'budgetcell budgetcelltitle'}>{'Remove'}</div> }
      </div>,
      // Datarows
      data.map(d => <div key={d._id} className={'budgetrow'}>
        { keys.map(k => <div key={`${d._id}${k}`} className={'budgetcell'}>{d[k]}</div>) }
        { removeEnabled && <div key={`${d._id}remove`} className={'budgetcell budgetcellremove'} onClick={() => { removeBudget({ _id: d._id, }); }}>{'Remove'}</div>}
      </div>),
    ];
  }

  render () {
    return (
      <div className={'budget commoncontainer'}>
        { (this.props.loading && this.props.data.length <= 0)
          ? <div>{'Loading!'}</div>
          : (this.props.data.length <= 0
            ? <div>{'No data found!'}</div>
            : this.renderBudgetData())}
      </div>
    );
  }

}


Budget.propTypes = {
  containerActionType: PropTypes.string.isRequired,
  removeBudget: PropTypes.func.isRequired,
  getBudget: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
  loading: state.budgetStore.loading,
  data: state.budgetStore.data,
});

const mapDispatchToProps = dispatch => ({
  getBudget: () => dispatch(getBudget()),
  removeBudget: data => dispatch(removeBudget(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Budget);
