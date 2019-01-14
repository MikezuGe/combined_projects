import React, { useState, } from 'react';
import PropTypes from 'prop-types';


const SimpleSelector = ({ items, onItemSelected, label, value, canUseNull, }) => {
  const [ hasSelection, setHasSelection, ] = useState(!!value);
  return (
    <select
      onChange={({ target: { value, }, }) => {
        !hasSelection && setHasSelection(true);
        onItemSelected(value);
      }}
      value={value}
    >
      {(!hasSelection || canUseNull) && <option>{label}</option>}
      {items.map(item => (
        <option key={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

SimpleSelector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onItemSelected: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  canUseNull: PropTypes.bool,
};


export default SimpleSelector
