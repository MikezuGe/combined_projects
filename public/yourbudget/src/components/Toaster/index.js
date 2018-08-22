import React from 'react';
import styled from 'styled-components';


const defaultOptions = {
  timeout: 1000,
};


let nextId = 0;
let listener = null;


export const addToast = (text, options) => {
  options = {
    // If some options are missing, use default options
    ...defaultOptions,
    ...options,
  }
  listener(text, options);
}


const Wrapper = styled.div`
position: absolute;
display: flex;
flex-direction: column;
background: white;
`;


const Toast = styled.div`
`;


class Toaster extends React.Component {

  componentDidMount () {
    listener = (text, options) => this.setState(prevState => {
      const id = nextId;
      setTimeout(() => {
        this.removeToast(id);
      }, options.timeout);
      return {
        ...prevState,
        toasts: [
          ...prevState.toasts,
          {
            id: nextId++,
            text,
            ...options,
          },
        ],
      }
    });
  }

  state = {
    toasts: [],
  }

  renderToasts () {
    return this.state.toasts.map(toast => <Toast key={toast.id}>toast.text</Toast>);
  }

  removeToast (id) {
    this.setState(prevState => ({ toasts: prevState.toasts.filter(toast => toast.id !== id), }));
  }

  render () {
    return (
      <Wrapper>
        {this.renderToasts()}
      </Wrapper>
    );
  }

}


export default Toaster;
