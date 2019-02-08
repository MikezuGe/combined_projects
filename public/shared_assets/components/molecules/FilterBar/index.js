import React, { useState, useEffect, useRef, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
`;

const Bar = styled.div`
align-items: center;
background: ${({ theme, }) => theme.secondaryColor};
border-radius: 1.5em;
display: flex;
height: 3em;
`;

const Filter = styled.span`
background: lightgray;
border-radius: 1em;
height: 2em;
line-height: 2em;
margin: 0.5em;
padding: 0 1em;
`;

const Suggestions = styled.div`
align-items: center;
background: ${({ theme, }) => theme.secondaryColor};
border-radius: 1.5em;
display: flex;
height: 3em;
margin: 0.5em 0;
`;

const Suggestion = styled.span`
background: lightgray;
border-radius: 1em;
height: 2em;
line-height: 2em;
margin: 0.5em;
padding: 0 1em;
`;


const FilterBar = ({ filters, onFiltersChange, }) => {
  console.table(filters);
  return (
    <Wrapper>


      <Bar>
        <Filter>
          {'Some text'}
        </Filter>
      </Bar>

      <Suggestions>
        {filters.map(filter => (
          <Suggestion key={filter.key}>
            {filter.name}
          </Suggestion>
        ))}
      </Suggestions>

    </Wrapper>
  );
};


FilterBar.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onFiltersChange: PropTypes.func.isRequired,
};


export default FilterBar;
