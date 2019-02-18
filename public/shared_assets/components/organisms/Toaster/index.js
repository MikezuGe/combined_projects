import React, { useState, useEffect, } from 'react';
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


const Toaster = () => {
  const [ toasts, setToasts, ] = useState([]);

  const addToast = toast => setToasts(toasts => [
    ...toasts,
    {
      ...toast,
      id: nextId++,
    },
  ]);

  const removeToast = toastId => setToasts(toasts => toasts.filter(({ id, }) => id !== toastId));

  useEffect(() => (listener = addToast), []);

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
};


export default Toaster;
