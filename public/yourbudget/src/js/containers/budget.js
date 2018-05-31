import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import store, { getBudget, } from '../redux/';

import '../../css/containers/common.css';
import '../../css/containers/budget.css';


const firstLetterToUpperCase = word => word.charAt(0).toUpperCase() + word.slice(1);


const getTitles = data => Object.keys(data)
  .filter(key => ![ '_id', 'dateAdded', 'isIncome', ].includes(key))
  .map(key => firstLetterToUpperCase(key.replace(/[^A-Za-zåäö]/gi, '')));


const parseBudgetData = data => {
  const titles = getTitles(data[0]);
  const keys = Object.keys(data[0])
    .filter(key => ![ '_id', 'dateAdded', 'isIncome', ].includes(key));
  return [
    // Titlerow
    <div key={'fr'} className={'budgetrow budgetrowtitle'}>
      { titles.map((title, i) => <div key={`fr${i}`} className={'budgetcell budgetcelltitle'}>{title}</div>) }
    </div>,
    // Datarows
    data.map(d => <div key={d._id} className={'budgetrow'}>
      { keys.map((k, i) => <div key={`${d._id}${i}`} className={'budgetcell'}>{d[k]}</div>) }
    </div>),
  ];
};


class Budget extends Component {

  componentDidMount = () => {
    if (this.props.data.length <= 0) {
      this.props.getBudget();
    }
  }

  render () {
    const { data, } = this.props;
    return (
      <div className={'budget commoncontainer'}>
        { data.length <= 0
          ? <div>{'Loading!'}</div>
          : parseBudgetData(data) }
      </div>
    );
  }

}


Budget.propTypes = {
  getBudget: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
  data: state.budgetStore.data,
});

const mapDispatchToProps = dispatch => ({
  getBudget: () => dispatch(getBudget()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Budget);
