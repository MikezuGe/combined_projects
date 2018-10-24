import React from 'react';
import PropTypes from 'prop-types';


const SubmitField = ({ value, onClick, ...rest }) => {
  return (
    <button
      {...rest}
      onClick={onClick}
    >
      {value || 'Submit'}
    </button>
  );
}


SubmitField.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default SubmitField;
