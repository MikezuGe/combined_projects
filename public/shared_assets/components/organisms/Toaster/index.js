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


export default class Toaster extends React.Component {

  state = {
    nextId: 0,
    toasts: [],
  }

  addToast = toast => {
    this.setState(({ nextId, toasts, }) => ({
      nextId: nextId + 1,
      toasts: [
        ...toasts,
        {
          ...toast,
          id: nextId,
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
        {toasts.map((props , i) => (
          <Toast
            key={`toast-${props.id}`}
            nthToast={i}
            {...props}
            removeToast={removeToast}
          />))}
      </StyledToaster>
    );
  }

}
