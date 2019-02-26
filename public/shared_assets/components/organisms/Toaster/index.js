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
  const [ runTimers, setRunTimers, ] = useState(true);

  const addToast = toast => setToasts(prevToasts => [
    ...prevToasts,
    {
      ...toast,
      id: nextId++,
    },
  ]);

  const removeToast = toastId => setToasts(toasts => toasts.filter(({ id, }) => id !== toastId));

  useEffect(() => (listener = addToast, undefined), []);

  return (
    <StyledToaster
      onMouseEnter={() => runTimers && setRunTimers(false)}
      onMouseLeave={() => !runTimers && setRunTimers(true)}
    >
      {toasts.map((toast, i) => (
        <Toast
          key={`toast-${toast.id}`}
          {...toast}
          runTimer={runTimers}
          nthToast={i}
          removeToast={removeToast}
        />
      ))}
    </StyledToaster>
  );
};


export default Toaster;
