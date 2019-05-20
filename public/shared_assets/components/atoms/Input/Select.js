import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledSelect = styled.select`
background: lime;
border-radius: 0.5em;
`;

const StyledOptionGroup = styled.optgroup`
background: lightblue;
border-radius: 0.5em;
`;

const StyledOption = styled.option`
background: black;
color: white;
border-radius: 0.5em;
`;


const Select = ({ options, ...rest }) => {
  const groupless = [];
  const opts = options.reduce((total, { text, value, group, }) => {
    if (group) {
      if (total[group]) {
        total[group].push({ text, value, });
      } else {
        total[group] = [ { text, value, }, ];
      }
    } else {
      groupless.push({ text, value, });
    }
    return total;
  }, {});
  return (
    <StyledSelect {...rest}>
      {groupless.map(({ text, value, }, i) => (
        <StyledOption
          key={value || i}
          value={value || ''}
        >
          {text || ' '}
        </StyledOption>
      ))}
      {Object.entries(opts).map(([ key, options, ]) => (
        <StyledOptionGroup
          key={key}
          label={key}
        >
          {options.map(({ value, text, }, i) => (
            <StyledOption
              key={i}
              value={value}
            >
              {text}
            </StyledOption>
          ))}
        </StyledOptionGroup>
      ))}
    </StyledSelect>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
    group: PropTypes.string,
  })),
};


export default Select;
