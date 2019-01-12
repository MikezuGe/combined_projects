import React, { useState, useEffect, useRef, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
`;

const FilterInput = styled.input`
`;


const FilterBar = ({ filters, onFiltersChange, }) => {
  const [ filterInEdit, setFilterInEdit, ] = useState(null);
  const [ selectedFilters, setSelectedFilters, ] = useState([]);
  const [ showSuggestions, setShowSuggestions, ] = useState(false);
  const WrapperRef = useRef(null);

  console.log('....');
  console.log(filterInEdit);
  console.log(showSuggestions);

  return (
    <Wrapper ref={WrapperRef}>
      {showSuggestions && (
        <div>
          {filters.filter(filter => !selectedFilters.find(({ key, }) => key === filter.key))
            .map(filter => (
              <div
                key={filter.key}
                onClick={() => {
                  console.log('editing');
                  setShowSuggestions(false);
                  setFilterInEdit({
                    ...filter,
                    value: '',
                  });
                }}
              >
                {filter.name}
              </div>
            ))}
        </div>
      )}
      <div onClick={() => setShowSuggestions(true)}>asdasd</div>
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
