import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const TextField = props => {
  const { name, type, value, onChange, } = props;
  return (
    <div>
      <label>Label</label>
      <input name={name} type={type} value={value} onChange={onChange} />
    </div>
  );
}


export default TextField;
