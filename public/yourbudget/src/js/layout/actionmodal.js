import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import '../../css/layout/actionmodal.css';

import { modalFormTypes, BudgetAdd, } from '../modalforms';


class ActionModal extends Component {

  state = {
    animate: true,
  }

  close = e => {
    if (this.state.animate || !e.target.classList.contains('actionmodal') && !e.target.classList.contains('grayout')) {
      return;
    }
    this.toggleAnimation();
    setTimeout(() => {
      this.props.closeActionModal();
    }, 500);
  }

  toggleAnimation = () => {
    this.setState({ animate: !this.state.animate, });
  }

  renderItems = () => {
    const { actionModalFormType, } = this.props;
    switch (actionModalFormType) {
    case modalFormTypes.budgetAddModalForm:
      return <BudgetAdd close={this.close} />;
    default:
      throw new Error(`Unknown modal form type: ${actionModalFormType}`);
    }
  }

  render () {
    return (
      <div className={this.state.animate
        ? 'grayout'
        : 'grayout actionmodalanimationpaused'}
      onClick={this.close}>
        <div className={this.state.animate
          ? 'actionmodal'
          : 'actionmodal actionmodalanimationpaused'}
        onAnimationIteration={this.toggleAnimation}>
          <div className={'actionmodalcontent'}>
            { this.renderItems() }
          </div>
        </div>
      </div>
    );
  }

}


ActionModal.propTypes = {
  actionModalFormType: PropTypes.string.isRequired,
  closeActionModal: PropTypes.func.isRequired,
};


export default ActionModal;
