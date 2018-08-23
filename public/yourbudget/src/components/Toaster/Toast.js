import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const animate = {
  DELAY_IN: 500,
  DELAY_OUT: 500,
  DELAY_UP: 500,
  INITIAL: 'INITIAL',
  IN: 'IN',
  WAIT_FOR_UPDATE: 'WAIT_FOR_UPDATE',
  UP: 'UP',
  WAIT_FOR_TIMEOUT: 'WAIT_FOR_TIMEOUT',
  OUT: 'OUT',
};
// KOMMENTTI

const StyledToast = styled.div`
background: red;
transform: translate(
  ${({ animation, }) => animation === animate.INITIAL || animation === animate.OUT ? '120' : '0'}%,
  ${/*({ animation, }) => animation === animate.UP ? '0' : '100'*/0}%);
padding: 25px 50px;
margin: 2.5px 2px;
border: 5px solid lime;
transition: transform ${props => (props.animation === animate.IN && animate.DELAY_IN) || (props.animation === animate.UP && animate.DELAY_UP) || (props.animation === animate.OUT && animate.DELAY_OUT)}ms linear;
&:first-child {
  margin-top: 5px;
}
&:last-child {
  margin-bottom: 5px;
}
`;


class Toast extends React.Component {

  componentDidMount () {
    setTimeout(this.update, 100);
  }
  
  componentWillReceiveProps () {
    if (this.state.animation === animate.WAIT_FOR_UPDATE) {
      this.update();
    }
  }

  state = {
    ...this.props,
    animation: animate.INITIAL,
    positionY: null,
  }

  update = (forceRemove) => {
    if (forceRemove) {
      this.setState({ animation: animate.OUT, });
      setTimeout(() => this.props.removeToast(this.props.id), animate.DELAY_OUT);
      return;
    }
    const { animation, } = this.state;
    if (animation === animate.INITIAL) {
      this.setState({
        animation: animate.IN,
        positionY: ReactDOM.findDOMNode(this.refs['toast']).getBoundingClientRect().y,
      });
      setTimeout(this.update, animate.DELAY_IN);
    } else if (this.props.upMost) {
      if (animation === animate.IN || animation === animate.UP) {
        this.setState({ animation: animate.WAIT_FOR_TIMEOUT, }); 
        setTimeout(this.update, this.props.timeout);
      } else if (animation === animate.WAIT_FOR_TIMEOUT) {
        this.setState({ animation: animate.OUT, });
        setTimeout(this.props.removeToast, animate.DELAY_OUT);
      }
    } else {
      if (animation === animate.IN) {
        this.setState({
          animation: animate.WAIT_FOR_UPDATE,
          positionY: ReactDOM.findDOMNode(this.refs['toast']).getBoundingClientRect().y,
        });
      } else if (animation === animate.UP) {
        this.setState({
          animation: animate.WAIT_FOR_UPDATE,
          positionY: ReactDOM.findDOMNode(this.refs['toast']).getBoundingClientRect().y,
        });
      } else if (animation === animate.WAIT_FOR_UPDATE) {
        this.setState({ animation: animate.UP, });
        setTimeout(this.update, this.props.timeout);
      }
    }
  }

  render () {
    return (
      <StyledToast
        ref='toast'
        animation={this.state.animation}
        positionY={this.state.positionY}
        onClick={() => this.update(true)}
      >
        {this.props.text + ' ' + this.props.id}
      </StyledToast>
    );
  }

}


export default Toast;