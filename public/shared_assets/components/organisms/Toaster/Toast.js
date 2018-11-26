import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledToast = styled.li`
background: ${({ theme: { secondaryColor, }, }) => secondaryColor};
position: absolute;
width: 100%;
right: 0;
margin: 1em;
padding: 0.5em;
border: 5px solid black;
border-radius: 0.5em;
transform: translate(${({ animate, nthToast, }) => `${animate ? 125 : 0}%, ${nthToast * 105}%`});
transition: transform 500ms;
`;

const ToastTitle = styled.h2``;

const ToastText = styled.div``;


export default class Toast extends React.Component {

  componentDidMount () {
    const { timeout, } = this.props;
    setTimeout(() => this.setState({ animate: false, }), 50);
    this.timeoutId = setTimeout(this.removeSelf, timeout);
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timeout: PropTypes.number.isRequired,
    nthToast: PropTypes.number.isRequired,
    removeToast: PropTypes.func.isRequired,
  }

  static defaultProps = {
    timeout: 5000,
    title: 'NO TITLE PROVIDED',
    text: 'NO TEXT PROVIDED'
  }

  timeoutId = null;
  state = {
    animate: true,
  }

  removeSelf = () => {
    const { removeToast, id, } = this.props;
    clearTimeout(this.timeoutId);
    this.setState({ animate: true, });
    this.nextAction = () => removeToast(id);
    this.timeoutId = setTimeout(() => removeToast(id), 550);
  }

  render () {
    const { animate, } = this.state;
    const { title, text, nthToast, } = this.props;
    return (
      <StyledToast nthToast={nthToast} animate={animate} onClick={this.removeSelf}>
        <ToastTitle>
          {title}
        </ToastTitle>
        <ToastText>
          {text}
        </ToastText>
      </StyledToast>
    );
  }

}
