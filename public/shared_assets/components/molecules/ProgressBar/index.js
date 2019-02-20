import React, { useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';

import { Progress, } from '../../atoms';
import { Timer, } from '../../utility';


const ProgressBar = ({ callback, time, pause, }) => {
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = new Timer(callback, time);
  }, []);

  useEffect(() => {
    if (pause) {
      return;
    }
    const { current: timer, } = timerRef;
    timer.start();
    return () => timer.stop();
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
