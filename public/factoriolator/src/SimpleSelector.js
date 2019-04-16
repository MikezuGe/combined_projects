import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;


const SimpleSelector = ({ label, items, onChange, initialValue, nullable, }) => {
  const [ hasSelection, setHasSelection, ] = useState(!!initialValue);
  return (
    <Wrapper>
      {label && <label>{label}</label>}
      <select
        onChange={({ target: { value, }, }) => {
          !hasSelection && setHasSelection(true);
          onChange(items[value]);
        }}
        defaultValue={initialValue ? initialValue.name : ''}
      >
        {(nullable || !hasSelection) && <option value={''}>{''}</option>}
        {Object.values(items).map(({ name, }) => (
          <option
            key={name}
            value={name}
          >
            {name}
          </option>
        ))}
      </select>
    </Wrapper>
  )
};

SimpleSelector.propTypes = {
  label: PropTypes.string,
  items: PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.object,
  nullable: PropTypes.bool,
};

SimpleSelector.defaultProps = {
  nullable: false,
};


export default SimpleSelector;
