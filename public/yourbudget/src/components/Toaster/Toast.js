import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';


const animation = {
  MOVE_IN: 'MOVE_IN',
  WAIT: 'WAIT',
  TIMEOUT: 'TIMEOUT',
  MOVE_OUT: 'MOVE_OUT',
  duration: {
    MOVE_IN: 1000,
    MOVE_OUT: 1000,
  },
};


const doAnimation = props => {
  const { activeAnimation, } = props;
  return activeAnimation !== animation.WAIT ? `animation: ${activeAnimation} ${animation.duration[activeAnimation] || props.timeout}ms` : '';
}


const StyledToast = styled.div`
position: relative;
background: red;
padding: 25px 50px;
margin: 2.5px 2px;
border: 5px solid lime;
&:first-child {
  margin-top: 5px;
}
&:last-child {
  margin-bottom: 5px;
}
@keyframes ${animation.MOVE_IN} { from { transform: translateX(120%) }; }
@keyframes ${animation.TIMEOUT} { }
@keyframes ${animation.MOVE_OUT} { to { transform: translateX(120%) }; }
${props => doAnimation(props)}
`;


class Toast extends React.Component {

  static getDerivedStateFromProps (props, state) {
    if (props.uppermostToast && state.activeAnimation === animation.WAIT) {
      state.activeAnimation = animation.TIMEOUT;
      return state;
    }
    return null;
  }

  state = {
    activeAnimation: animation.MOVE_IN,
  }

  nextAction = e => {
    if (!e || e.animationName === animation.TIMEOUT) {
      this.setState({ activeAnimation: animation.MOVE_OUT, });
    } else if (e.animationName === animation.MOVE_IN) {
      this.setState({ activeAnimation: this.props.uppermostToast ? animation.TIMEOUT : animation.WAIT, });
    } else if (e.animationName === animation.MOVE_OUT) {
      this.props.removeToast(this.props.id);
    }
  }

  render () {
    return (
      <StyledToast
        timeout={this.props.timeout}
        activeAnimation={this.state.activeAnimation}
        onAnimationEnd={this.nextAction}
        onClick={() => this.nextAction()}
      >
        {this.props.text + ' ' + this.props.id}
      </StyledToast>
    );
  }

}


Toast.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
  uppermostToast: PropTypes.bool.isRequired,
  removeToast: PropTypes.func.isRequired,
}


export default Toast;