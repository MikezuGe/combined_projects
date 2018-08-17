import React from 'react';
import styled from 'styled-components';


const GrayoutContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${props => props.active ? 'visible' : 'hidden'};
  background: rgba(128, 128, 128, ${props => props.active ? '0.5' : '0.0'});
  transition: background 0.5s, visibility 0.0s linear ${props => props.active ? '0.0' : '0.5'}s;
`;


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  transform: translateY(${props => props.active ? '0' : '-100' }%);
  transition: transform 0.5s ease-out;
`;


class Modal extends React.Component {

  render () {
    const { active, form, close, } = this.props;
    return (
      <GrayoutContainer active={active}>
        {/* Move onclick={close} to the form, which as exit button, or cancel */}
        <Container active={active} onClick={close}>
          <div style={{background: 'red', width: '10%', height: '10%',}}>test</div>
        </Container>
      </GrayoutContainer>
    )
  }

}


export default Modal;
