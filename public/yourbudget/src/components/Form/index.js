import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export { default as Field, } from './Field';


const Wrapper = styled.form`
display: flex;
flex-direction: column;`;


export default class Form extends React.Component {

  renderChildren () {
    return this.props.children.map(field => <field.type
      {...field.props}
      additional={'asdasd'}
    />);
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();
  }

  render () {
    return (
      <Wrapper onSubmit={this.onSubmit}>
        { this.renderChildren() }
        <div onClick={this.props.close}>{'Cancel'}</div>
      </Wrapper>
    );
  }

}


Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired,
};
