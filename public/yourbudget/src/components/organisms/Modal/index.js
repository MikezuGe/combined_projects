import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export const openModal = form => listener(form);
let listener = null;


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

  componentDidMount () {
    listener = this.open;
  }

  state = {
    childInView: null,
    active: false,
  }

  keyupListener = e => {
    if (e.keyCode === '27' || e.key === 'Escape') {
      this.close();
    }
  }

  open = (childInView) => {
    this.setState({
      active: true,
      childInView,
    });
    window.addEventListener('keyup', this.keyupListener, false);
  }

  close = () => {
    this.setState({
      active: false,
      childInView: null,
    });
    window.removeEventListener('keyup', this.keyupListener, false);
  }

  render () {
    const { props: { modalViews, }, state: { active, childInView, }, } = this;
    return (
      <GrayoutContainer active={active} onClick={this.close}>
        <Wrapper active={active}>
          <InnerWrapper onClick={e => e.stopPropagation()}>
            { childInView && modalViews[childInView]() }
          </InnerWrapper>
        </Wrapper>
      </GrayoutContainer>
    )
  }

}


Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  modalViews: PropTypes.object,
};


export default Modal;
