import React from 'react';
import styled from 'styled-components';


const GrayoutContainer = styled.div`
position: fixed;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
transition: background 500ms, visibility 0ms linear ${({ active, }) => active ? 0 : 500}ms;
background: rgba(128, 128, 128, ${({ active, }) => active ? 0.5 : 0.0});
visibility: ${({ active, }) => active ? 'visible' : 'hidden'};
`;


const Wrapper = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
transition: transform 500ms;
transform: translateY(${({ active, }) => active ? 0 : -100}%);
`;


const InnerWrapper = styled.div`

`;


class Modal extends React.Component {

  state = {
    ModalChild: null,
    active: false,
  }

  keyupListener = e => {
    if (e.keyCode === '27' || e.key === 'Escape') {
      this.close();
    }
  }

  openModal = ({ component, }) => {
    console.log(component);
    this.setState({
      active: true,
      ModalChild: component,
    });
    window.addEventListener('keyup', this.keyupListener, false);
  }

  closeModal = () => {
    this.setState({
      active: false,
    });
    window.removeEventListener('keyup', this.keyupListener, false);
  }

  clearModal = () => !this.state.active && this.setState({ ModalChild: null, })

  render () {
    const { active, ModalChild, } = this.state;
    return (
      <GrayoutContainer active={active} onClick={this.closeModal} onTransitionEnd={this.clearModal}>
        <Wrapper active={active}>
          <InnerWrapper onClick={e => e.stopPropagation()}>
            {
              ModalChild && (
                <ModalChild
                  onClose={() => {
                    ModalChild.props.onClose();
                    this.close();
                  }}
                />
              )
            }
          </InnerWrapper>
        </Wrapper>
      </GrayoutContainer>
    )
  }

}


export default Modal;
