import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;


export default class Form extends React.Component {

  state = {
    fields: [],
  }

  render () {
    return (
      <Wrapper>Form</Wrapper>
    );
  }

}


Form.propTypes = {

};
