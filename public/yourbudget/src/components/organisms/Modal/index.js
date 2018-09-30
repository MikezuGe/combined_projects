import React from 'react';
import styled from 'styled-components';

import {
  BudgetAdd,
  Login,
  modalFormTypes,
} from '../../modalForms';


export { modalFormTypes, };
export const openModal = form => listener(form);
let listener = null;


const GrayoutContainer = styled.div`
position: absolute;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
transition: background 500ms, visibility 0ms linear ${({ active, }) => active ? 0 : 500}ms;
background: rgba(128, 128, 128, ${({ active, }) => active ? 0.5 : 0.0});
visibility: ${({ active, }) => active ? 'visible' : 'hidden'}`;


const Wrapper = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
transition: transform 500ms;
transform: translateY(${({ active, }) => active ? 0 : -100}%);`;


export default class Modal extends React.Component {
  
  componentDidMount () {
    listener = this.open;
    // Remove when done debugging
    //this.open(modalFormTypes.BUDGET_ADD);
  }

  state = {
    active: false,
    modalFormType: modalFormTypes.BUDGET_ADD,
  }

  keyupListener = e => {
    if (e.keyCode === '27' || e.key === 'Escape') {
      this.close();
    }
  }

  open = modalFormType => {
    window.addEventListener('keyup', this.keyupListener, false);
    this.setState({
      active: true,
      modalFormType,
    });
  }
  close = () => {
    this.setState({ active: false, });
    window.removeEventListener('keyup', this.keyupListener, false);
  }

  render () {
    const { state: { modalFormType, active, }, } = this;
    return (
      <GrayoutContainer active={active}>
        <Wrapper active={active} onAnimationEnd={() => !this.state.active && this.setState({ modalFormType: null, })}>
          {
            (modalFormType === modalFormTypes.BUDGET_ADD && <BudgetAdd close={this.close} />) ||
            (modalFormType === modalFormTypes.LOGIN && <Login close={this.close} />) ||
            <div>{`Invalid form type ${modalFormType}`}</div>
          }
        </Wrapper>
      </GrayoutContainer>
    )
  }

}
