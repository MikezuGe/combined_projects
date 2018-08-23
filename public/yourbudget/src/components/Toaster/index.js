import React from 'react';
import styled from 'styled-components';

import Toast from './Toast';


const defaultOptions = {
  timeout: 1000,
};


let nextId = 0;
let listener = null;


export const addToast = (text, options) => listener(text, {
  // If some options are missing, use default options
  ...defaultOptions,
  ...options,
});


const Wrapper = styled.div`
position: absolute;
top: 10px;
right: 10px;
display: flex;
flex-direction: column;
`;


class Toaster extends React.Component {

  componentDidMount () {
    listener = this.addToast;
  }

  state = {
    toasts: [],
  }

  addToast = (text, options) => this.setState(prevState => ({
    ...prevState,
    toasts: [
      ...prevState.toasts,
      {
        id: nextId++,
        text,
        ...options,
      },
    ],
  }));

  removeToast = id => this.setState(prevState => ({
    toasts: id
      ? prevState.toasts.filter(toast => toast.id !== id)
      : prevState.toasts.slice(1),
  }));

  renderToasts () {
    return this.state.toasts.map((props, i) => <Toast
      key={props.id}
      {...props}
      upMost={i === 0}
      removeToast={this.removeToast}
    />);
  }

  render () {
    return (
      <Wrapper>
        {this.renderToasts()}
      </Wrapper>
    );
  }

}


export default Toaster;
