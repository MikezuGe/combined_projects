import React, { useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';

import { Progress, } from '../../atoms';
import { Timer, } from '../../utility';


const ProgressBar = ({ callback, time, pause, }) => {
  const timerRef = useRef(Timer({ callback, timeLeft: time, }));

  useEffect(() => {
    if (!pause) {
      timerRef.current.start();
      return () => timerRef.current.stop();
    }
  }, [ pause, ]);

  return (
    <Progress
      time={time}
      pause={pause}
    />
  );
};

ProgressBar.defaultProps = {
  pause: false,
};

ProgressBar.propTypes = {
  callback: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  pause: PropTypes.bool,
};


export default ProgressBar;
