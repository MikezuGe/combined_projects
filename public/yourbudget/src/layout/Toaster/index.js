import React from 'react';
import styled from 'styled-components';

import Toast from './Toast';


const defaultOptions = {
  timeout: 5000,
};


let nextId = 0;
let listener = null;


export const addToast = (text, options) => listener({
  ...defaultOptions,
  ...options,
  id: nextId++,
  text,
});


const Wrapper = styled.ul`
position: absolute;
top: 10px;
right: 10px;
list-style: none;`;


class Toaster extends React.Component {

  componentDidMount () {
    listener = this.addToast;
  }

  state = {
    toasts: [],
  }

  addToast = toast => this.setState(prevState => ({
    toasts: [
      ...prevState.toasts,
      toast,
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
      nthToast={i}
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
