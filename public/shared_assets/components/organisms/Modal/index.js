import React from 'react';
import styled from 'styled-components';


const Grayout = styled.div`
position: fixed;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
visibility: ${({ active, }) => active ? 'visible' : 'hidden'};
background: rgba(128, 128, 128, ${({ active, }) => active ? 0.5 : 0.0});
transition: background 500ms, visibility 0ms linear ${({ active, }) => active ? 0 : 500}ms;
`;

const StyledModal = styled.div`
position: relative;
top: ${({ active, }) => active ? 0 : -100}%;
transition: top 500ms ease-out;
`;


export default class Modal extends React.Component {

  state = {
    active: false,
    render: null,
  }

  openModal = render => this.setState({
    active: true,
    render,
  });
  
  closeModal = () => {
    this.setState({ active: false, })
    setTimeout(() => this.setState({ render: null, }), 500)
  }

  render () {
    const { closeModal, } = this;
    const { active, render, } = this.state;
    return (
      <Grayout
        active={active}
        onClick={closeModal}
      >
        <StyledModal
          active={active}
          onClick={e => e.stopPropagation()}
        >
          {render && render({ closeModal, })}
        </StyledModal>
      </Grayout>
    );
  }

}
