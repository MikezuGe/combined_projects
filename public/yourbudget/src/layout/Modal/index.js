import React from 'react';
import styled from 'styled-components';

import { BudgetAdd, modalFormTypes, } from './forms';


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
${props => props.active
? `
visibility: visible;
@keyframes GRAYOUT_IN { from { background: rgba(128, 128, 128, 0.0) } to { background: rgba(128, 128, 128, 0.5) } }
animation: GRAYOUT_IN 500ms linear 0ms forwards;`
: `
visibility: hidden;
@keyframes GRAYOUT_OUT { from { background: rgba(128, 128, 128, 0.5) } to { background: rgba(128, 128, 128, 0.0) } }
transition: visibility 0ms linear 500ms;
animation: GRAYOUT_OUT 500ms;`}`;


const Wrapper = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
${props => props.active
? `
@keyframes MODAL_IN { from { transform: translateY(-100%) } }
animation: MODAL_IN 500ms;
`
: `
@keyframes MODAL_OUT { to { transform: translateY(-100%) } }
animation: MODAL_OUT 500ms;
`}`;


export default class Modal extends React.Component {
  
  componentDidMount () {
    listener = this.open;
  }

  state = {
    active: true,
    modalFormType: modalFormTypes.BUDGET_ADD,
  }

  open = modalFormType => this.setState({
    active: true,
    modalFormType,
  });

  close = () => this.setState({ active: false, });

  render () {
    const { state: { modalFormType, active, }, } = this;
    return (
      <GrayoutContainer active={active}>
        <Wrapper active={active} onAnimationEnd={() => !this.state.active && this.setState({ modalFormType: null, })}>
          {
            (modalFormType === modalFormTypes.BUDGET_ADD && <BudgetAdd close={this.close} />) ||
            <div>{`Invalid form type ${modalFormType}`}</div>
          }
        </Wrapper>
      </GrayoutContainer>
    )
  }

}
