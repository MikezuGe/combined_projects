import React from 'react';
import styled from 'styled-components';

import Toast from './Toast';


const StyledToaster = styled.ul`
position: absolute;
background: red;
top: 0;
right: 0;
width: 12em;
`;


let nextId = 0;
let listener = () => {};
export const addToast = toast => listener(toast);


export default class Toaster extends React.Component {

  componentDidMount () {
    listener = this.addToast;
  }

  state = {
    toasts: [],
  }

  addToast = toast => {
    this.setState(({ toasts, }) => ({
      toasts: [
        ...toasts,
        {
          ...toast,
          id: nextId++,
        },
      ],
    }))
  }

  removeToast = toastId => this.setState(({ toasts, }) => ({
    toasts: toasts.filter(({ id, }) => id !== toastId),
  }));

  render () {
    const { removeToast, } = this;
    const { toasts, } = this.state;
    return (
      <StyledToaster>
        {toasts.map((toast, i) => (
          <Toast
            key={`toast-${toast.id}`}
            {...toast}
            nthToast={i}
            removeToast={removeToast}
          />))}
      </StyledToaster>
    );
  }

}
