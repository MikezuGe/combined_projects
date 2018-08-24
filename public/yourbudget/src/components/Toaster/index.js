import React from 'react';
import styled from 'styled-components';

import Toast from './Toast';


const defaultOptions = {
  timeout: 1000,
};


let nextId = 0;
let listener = null;


export const addToast = (text, options) => listener({
  ...defaultOptions,
  ...options,
  id: nextId++,
  text,
});


const MOVE_UP = props => `
`;


const Wrapper = styled.div`
position: absolute;
top: 10px;
right: 10px;
`;


const MoveUp = styled.div`
display: flex;
flex-direction: column;
${props => props.shouldMoveUp ?
`@keyframes MOVE_UP {
  from { transform: translateY(${props.height || 80}px); }
}
animation: MOVE_UP ${props.duration || 1000}ms;
`
: ''}
`;


class Toaster extends React.Component {

  componentDidMount () {
    listener = this.addToast;
  }

  state = {
    shouldMoveUp: false,
    toasts: [],
  }

  addToast = toast => this.setState(prevState => ({
    toasts: [
      ...prevState.toasts,
      toast,
    ],
  }));

  removeToast = id => this.setState(prevState => ({
    shouldMoveUp: !!id,
    toasts: id
      ? prevState.toasts.filter(toast => toast.id !== id)
      : prevState.toasts.slice(1),
  }));
        

  renderToasts () {
    return this.state.toasts.map((props, i) => <Toast
      key={props.id}
      {...props}
      uppermostToast={i === 0}
      removeToast={this.removeToast}
    />);
  }

  onMoveUpDone = e => {
    if (e.animationName === 'MOVE_UP') {
      this.setState({ shouldMoveUp: false, });
    }
  }

  render () {
    return (
      <Wrapper>
        <MoveUp shouldMoveUp={this.state.shouldMoveUp} onAnimationEnd={this.onMoveUpDone}>
          {this.renderToasts()}
        </MoveUp>
      </Wrapper>
    );
  }

}


export default Toaster;
