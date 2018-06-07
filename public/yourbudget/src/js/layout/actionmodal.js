import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import 'css/layout/actionmodal.css';

import { modalFormTypes, BudgetAdd, } from 'js/modalforms';


class ActionModal extends Component {

  state = {
    animate: true,
  }

  close = e => {
    if (e !== 'force' && (this.state.animate || (!e.target.classList.contains('actionmodal') && !e.target.classList.contains('grayout')))) {
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

  renderItem = () => {
    const { close, props: { actionModalFormType, }, } = this;
    switch (actionModalFormType) {
    case modalFormTypes.BUDGET_ADD_MODAL_FORM:
      return <BudgetAdd close={close} />;
    default:
      throw new Error(`Unknown modal form type: ${actionModalFormType}`);
    }
  }

  render () {
    const { close, toggleAnimation, renderItem, state: { animate, }, } = this;
    return (
      <div className={`grayout ${animate ? '' : 'animationpaused'}`} onClick={close}>
        <div className={`actionmodal ${animate ? '' : 'animationpaused'}`} onAnimationIteration={toggleAnimation}>
          <div className={'actionmodalcontent'}>{ renderItem() }</div>
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
