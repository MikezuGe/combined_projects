import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';


const TOAST_INITIAL = 'TOAST_INITIAL';
const TOAST_IN = 'TOAST_IN';
const TOAST_WAIT = 'TOAST_WAIT';
const TOAST_TIMEOUT = 'TOAST_TIMEOUT';
const TOAST_OUT = 'TOAST_OUT';


const StyledToast = styled.li`
position: absolute;
right: 0px;
display: flex;
align-items: center;
justify-content: center;
min-width: 200px;
padding: 25px 25px;
background: red;
border: 5px solid lime;
transform: translate(
  ${({ currentAction, nthToast }) => `${currentAction === TOAST_INITIAL || currentAction === TOAST_OUT ? 120 : 0}%,
  ${115 * nthToast}%`}
);
transition: transform 1000ms;`;


class Toast extends React.Component {

  componentDidMount () {
    this.nextActiontimeout = setTimeout(this.nextAction, 50);
  }
  
  componentWillUnmount () {
    clearTimeout(this.nextActionTimeout);
  }

  nextActionTimeout = null
  state = {
    currentAction: TOAST_INITIAL,
  }

  nextAction = e => {
    if (e && e.type === 'click') {
      clearTimeout(this.nextActionTimeout);
      this.setState({ currentAction: TOAST_OUT, });
      return;
    }
    const { currentAction, } = this.state;
    if (currentAction === TOAST_INITIAL) {
      this.setState({ currentAction: TOAST_IN, });
    } else if ((currentAction === TOAST_IN || currentAction === TOAST_WAIT) && this.props.nthToast === 0) {
      this.setState({ currentAction: TOAST_TIMEOUT, });
      this.nextActionTimeout = setTimeout(this.nextAction, this.props.timeout);
    } else if (currentAction === TOAST_IN) {
      this.setState({ currentAction: TOAST_WAIT, });
    } else if (currentAction === TOAST_TIMEOUT) {
      clearTimeout(this.nextActionTimeout);
      this.setState({ currentAction: TOAST_OUT, });
    } else if (currentAction === TOAST_OUT) {
      this.props.removeToast(this.props.id);
    }
  }

  render () {
    return (
      <StyledToast
        currentAction={this.state.currentAction}
        nthToast={this.props.nthToast}
        onTransitionEnd={this.nextAction}
        onClick={this.nextAction}
      >
        {this.props.text}
      </StyledToast>
    );
  }

}


Toast.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
  nthToast: PropTypes.number.isRequired,
  removeToast: PropTypes.func.isRequired,
}


export default Toast;
