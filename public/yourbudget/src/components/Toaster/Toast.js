import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const animationDelay = {
  in: 500,
  out: 500,
  up: 500,
};
const INITIAL = 'INITIAL';
const ANIMATE_IN = 'ANIMATE_IN';
const WAIT_FOR_UPDATE = 'WAIT_FOR_UPDATE';
const ANIMATE_UP = 'ANIMATE_UP';
const ON_TIMEOUT = 'ON_TIMEOUT';
const ANIMATE_OUT = 'ANIMATE_OUT';


const StyledToast = styled.div`
background: red;
transform: translate(
  ${props => props.animation === INITIAL || props.animation === ANIMATE_OUT ? '120%' : '0%'},
  ${props => props.animation === ANIMATE_UP ? '0%' : `${props.positionY}px`});
padding: 25px 50px;
margin: 2.5px 2px;
border: 5px solid lime;
transition: transform ${props => (props.animation === ANIMATE_IN && animationDelay.in) || (props.animation === ANIMATE_UP === 2 && animationDelay.up) || (props.animation === ANIMATE_OUT && animationDelay.out)}ms linear;
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
    if (this.state.animation === WAIT_FOR_UPDATE) {
      this.update();
    }
  }

  state = {
    ...this.props,
    animation: INITIAL,
    positionY: null,
  }

  update = () => {
    const { animation, } = this.state;
    if (animation === INITIAL) {
      this.setState({
        animation: ANIMATE_IN,
        positionY: ReactDOM.findDOMNode(this.refs['toast']).getBoundingClientRect().y,
      });
      setTimeout(this.update, animationDelay.in);
    } else if (this.props.upMost) {
      if (animation === ANIMATE_IN || animation === ANIMATE_UP) {
        this.setState({ animation: ON_TIMEOUT, }); 
        setTimeout(this.update, this.props.timeout);
      } else if (animation === ON_TIMEOUT) {
        this.setState({ animation: ANIMATE_OUT, });
        setTimeout(this.props.removeToast, animationDelay.out);
      }
    } else {
      if (animation === ANIMATE_IN) {
        this.setState({
          animation: WAIT_FOR_UPDATE,
          positionY: ReactDOM.findDOMNode(this.refs['toast']).getBoundingClientRect().y,
        });
      } else if (animation === ANIMATE_UP) {
        this.setState({
          animation: WAIT_FOR_UPDATE,
          positionY: ReactDOM.findDOMNode(this.refs['toast']).getBoundingClientRect().y,
        });
      } else if (animation === WAIT_FOR_UPDATE) {
        this.setState({ animation: ANIMATE_UP, });
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
      >
        {this.props.text}
      </StyledToast>
    );
  }

}


export default Toast;