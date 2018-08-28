import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Textfield, } from './Fields';


const Wrapper = styled.form`
display: flex;
flex-direction: column;`;


export default class Form extends React.Component {

  state = {
    fields: {},
  }

  onSubmit (e) {
    console.log(e);
    e.preventDefault();
  }

  render () {
    return (
      <Wrapper onSubmit={this.onSubmit}>
        <Textfield name={'name'} />
      </Wrapper>
    );
  }

}


Form.propTypes = {

};
