import React from 'react';
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


export default class Modal extends React.Component {

  componentDidMount () {
    listener = this.open;
  }

  state = {
    active: false,
  }

  keyupListener = e => {
    if (e.keyCode === '27' || e.key === 'Escape') {
      this.close();
    }
  }

  open = () => {
    this.setState({ active: true, });
    window.addEventListener('keyup', this.keyupListener, false);
  }

  close = () => {
    this.setState({ active: false, });
    window.removeEventListener('keyup', this.keyupListener, false);
  }

  render () {
    const { props: { children, }, state: { active, }, } = this;
    return (
      <GrayoutContainer active={active} onClick={this.close}>
        <Wrapper active={active}>
          <InnerWrapper onClick={e => e.stopPropagation()}>
            { children }
          </InnerWrapper>
        </Wrapper>
      </GrayoutContainer>
    )
  }

}
