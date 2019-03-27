import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Bar = styled.div`
border: 1px solid black;
width: 100%;
height: 0.5em;
`;

const Filler = styled.div.attrs(({ pause, }) => ({
  style: {
    animationPlayState: pause ? 'paused' : 'running',
  },
}))`
height: 100%;
background: blue;
@keyframes animate {
  from { width: 0%; }
  to { width: 100%; }
}
animation: animate ${({ time, }) => time}ms linear;
`;


const Progress = props => (
  <Bar>
    <Filler {...props} />
  </Bar>
);

Progress.propTypes = {
  time: PropTypes.number.isRequired,
  pause: PropTypes.bool,
};


export default Progress;
