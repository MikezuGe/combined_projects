import React, { useState, useEffect, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
margin-bottom: 1em;
`;

const SelectionArea = styled.div`
background: ${({ theme, }) => theme.secondaryColor}};
height: 3em;
border-radius: 1.5em;
padding: 0 1em;
display: flex;
align-items: center;
`;

const Selection = styled.div`
background: lightgray;
height: 2em;
border-radius: 1em;
padding: 0 1em;
display: flex;
align-items: center;
`;

const Suggestions = styled.ul`  
border-radius: 1.5em;
background: ${({ theme, }) => theme.secondaryColor}};
position: absolute;
`;

const Suggestion = styled.li`
display: flex;
align-items: center;
border-radius: 1em;
padding: 0 1em;
height: 2em;
margin: 0.5em;
border: 1px solid black;
cursor: pointer;
`;

const StyledInput = styled.input`
background: ${({ theme, }) => theme.secondaryColor}};
border: none;
`;
  

const handleFilterValue = (type, value) => {
  switch (type) {
  case 'number': return parseFloat(value);
  case 'date': return new Date(value);
  case 'text':
  default: return value;
  }
};


let wrapperRef = null;


const FilterBar = ({ filters, onFiltersChange, }) => {
  const [ showSuggestions, setShowSuggestions, ] = useState(false);
  const [ filterInEdit, setFilterInEdit, ] = useState({ key: null, value: '', type: '', });
  const [ selectedFilters, setSelectedFilters, ] = useState([]);

  const suggestionClick = ({ key, value, }) => {
    setSelectedFilters(selectedFilters.filter(filter => filter.key !== key))
    setFilterInEdit({ key, value, type: filters[key] });
    setShowSuggestions(false);
  };

  const inputBlur = () => {
    filterInEdit.value && setSelectedFilters([ ...selectedFilters, filterInEdit, ]);
    setFilterInEdit({ key: null, value: '', type: '', });
  };

  useEffect(() => {
    onFiltersChange(selectedFilters.reduce((total, { key, value, type, }) => (
      total[key] = handleFilterValue(type, value), total
    ), {}));
  }, [ selectedFilters, ]);

  useEffect(() => {
    const listener = e => !wrapperRef.contains(e.target) && setShowSuggestions(false);
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, []);

  return (
    <Wrapper onClick={() => setShowSuggestions(!showSuggestions)} ref={ref => (wrapperRef = ref)}>
      <SelectionArea>
        {selectedFilters.map(({ key, value, }) => (
          <Selection
            key={key}
            onClick={() => suggestionClick({ key, value, })}
          >
            {`${key}: ${value}`}
          </Selection>
        ))}
        {filterInEdit.key && (
          <Selection onClick={e => e.stopPropagation()}>
            {`${filterInEdit.key}:`}
            <StyledInput
              autoFocus
              type={'text'}
              defaultValue={filterInEdit.value}
              onChange={e => setFilterInEdit({ ...filterInEdit, value: e.target.value, })}
              onBlur={inputBlur}
            />
          </Selection>
        )}
      </SelectionArea>
      {showSuggestions && (
        <Suggestions>
          {Object.entries(filters)
            .filter(([ key, ]) => !(filterInEdit.key === key || selectedFilters.find(f => f.key === key)))
            .map(([ key, ]) => (
              <Suggestion 
                key={key}
                onClick={() => suggestionClick({ key, })}
              >
                {key}
              </Suggestion>
            ))
          }
        </Suggestions>
      )}
    </Wrapper>
  );
};


FilterBar.propTypes = {
  filters: PropTypes.objectOf(PropTypes.string).isRequired,
  onFiltersChange: PropTypes.func.isRequired,
};


export default FilterBar;
