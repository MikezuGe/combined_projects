import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


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


const startTimer = ({ callback, timeLeft, }) => ({
  id: setTimeout(callback, timeLeft),
  startTime: Date.now(),
  timeLeft,
  callback,
});

const stopTimer = ({ id, startTime, timeLeft, callback, }) => {
  clearTimeout(id)
  return {
    id: null,
    startTime: null,
    timeLeft: startTime + timeLeft - Date.now(),
    callback,
  };
};


const Toast = ({ id, title, text, nthToast, removeToast, timeout: timeLeft, }) => {
  const [ animate, setAnimate, ] = useState(true);
  const [ isBeingRemoved, setIsBeingRemoved, ] = useState(false);
  const [ timer, setTimer, ] = useState({});

  const animateAndRemove = () => !isBeingRemoved
    && (timer.id && clearTimeout(timer.id), setAnimate(true), setIsBeingRemoved(true));

  const toggleTimer = shouldStart => !isBeingRemoved && (shouldStart
    ? !timer.id && setTimer(prevTimer => startTimer(prevTimer))
    : timer.id && setTimer(prevTimer => stopTimer(prevTimer)));

  useEffect(() => {
    setTimeout(() => setAnimate(false), 50);
    setTimer(startTimer({ callback: animateAndRemove, timeLeft, }));
  }, []);

  return (
    <StyledToast
      nthToast={nthToast}
      animate={animate}
      onClick={animateAndRemove}
      onMouseOver={() => toggleTimer(false)}
      onMouseLeave={() => toggleTimer(true)}
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
  nthToast: PropTypes.number.isRequired,
  removeToast: PropTypes.func.isRequired,
  theme: PropTypes.shape({ animateSlow: PropTypes.string, }),
};


Toast.defaultProps = {
  timeout: 5000,
  title: 'NO TITLE PROVIDED',
  text: 'NO TEXT PROVIDED',
};


export default Toast;
