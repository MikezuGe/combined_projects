import React from 'react';
import styled from 'styled-components';

import Toast from './Toast';


let nextToastId = 0;
const defaultOptions = {
  timeout: 5000,
};


const Wrapper = styled.ul`
position: absolute;
top: 10px;
right: 10px;
list-style: none;
`;


class Toaster extends React.Component {

  state = {
    toasts: [],
  }

  addToast = (text, options) => this.setState(prevState => ({
    toasts: [
      ...prevState.toasts,
      {
        ...defaultOptions,
        ...options,
        id: nextToastId++,
        text,
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
      nthToast={i}
      removeToast={this.removeToast}
    />);
  }

  render () {
    return (
      <React.Fragment>
        <Wrapper>
          {this.renderToasts()}
        </Wrapper>
        {this.props.children}
      </React.Fragment>
    );
  }

}


export default Toaster;
