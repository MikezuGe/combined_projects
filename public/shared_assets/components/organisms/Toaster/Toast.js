import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ProgressBar, } from '../../molecules';


const StyledToast = styled.li`
background: ${({ theme, }) => theme.secondaryColor};
position: absolute;
width: 100%;
right: 0;
margin: 1em;
padding: 0.5em;
border: 5px solid black;
border-radius: 0.5em;
transform: translate(${({ inView, nthToast, }) => `${inView ? 0 : 125}%, ${nthToast * 105}%`});
transition: transform ${({ theme, }) => theme.animateSlow};
`;

const ToastTitle = styled.h2``;

const ToastText = styled.div``;


const Toast = ({ id, title, text, nthToast, timeout, runTimer, removeToast, }) => {
  const [ inView, setInView, ] = useState(false);
  const [ removing, setRemoving, ] = useState(false);

  const moveOutAndRemove = () => !removing
    && (setInView(false), setRemoving(true));

  useEffect(() => (setTimeout(() => setInView(true), 50), undefined), []);

  return (
    <StyledToast
      nthToast={nthToast}
      inView={inView}
      onClick={moveOutAndRemove}
      onTransitionEnd={() => removing && removeToast(id)}
    >
      <ToastTitle>
        {title}
      </ToastTitle>
      <ToastText>
        {text}
      </ToastText>
      <ProgressBar
        callback={moveOutAndRemove}
        time={timeout + 50}
        pause={!runTimer}
      />
    </StyledToast>
  );
};

Toast.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
  runTimer: PropTypes.bool.isRequired,
  nthToast: PropTypes.number.isRequired,
  removeToast: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  timeout: 5000,
  title: 'NO TITLE PROVIDED',
  text: 'NO TEXT PROVIDED',
};


export default Toast;
