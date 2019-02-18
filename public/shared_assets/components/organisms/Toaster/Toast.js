import React, { useState, useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Timer, } from '../../utility';


const StyledToast = styled.li`
background: ${({ theme, }) => theme.secondaryColor};
position: absolute;
width: 100%;
right: 0;
margin: 1em;
padding: 0.5em;
border: 5px solid black;
border-radius: 0.5em;
transform: translate(${({ animate, nthToast, }) => `${animate ? 125 : 0}%, ${nthToast * 105}%`});
transition: transform ${({ theme, }) => theme.animateSlow};
`;

const ToastTitle = styled.h2``;

const ToastText = styled.div``;


const Toast = ({ id, title, text, nthToast, timeout, runTimer, removeToast, }) => {
  const [ animate, setAnimate, ] = useState(true);
  const [ isBeingRemoved, setIsBeingRemoved, ] = useState(false);
  const timerRef = useRef();
  const { current: timer, } = timerRef;

  const animateAndRemove = () => !isBeingRemoved
    && (timer && timer.stop(), setAnimate(true), setIsBeingRemoved(true));

  useEffect(() => {
    setTimeout(() => setAnimate(false), 50);
    timeout > 0 && (timerRef.current = new Timer(animateAndRemove, timeout + 50));
  }, []);

  timer && useEffect(() => runTimer
    ? timer.start()
    : timer.stop(),
  [ runTimer, ]);

  return (
    <StyledToast
      nthToast={nthToast}
      animate={animate}
      onClick={animateAndRemove}
      onMouseEnter={timer && timer.stop || undefined}
      onMouseLeave={timer && timer.start || undefined}
      onTransitionEnd={() => isBeingRemoved && removeToast(id)}
    >
      <ToastTitle>
        {title}
      </ToastTitle>
      <ToastText>
        {text}
      </ToastText>
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
