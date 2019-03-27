import React, { useState, useEffect, useRef, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Icon, } from '../../atoms';
import { Tag, } from '../../molecules';


const Bar = styled.div`
align-items: center;
background: ${({ theme, }) => theme.secondaryColor}
border-radius: 1.5em;
display: flex;
height: 3em;
margin-bottom: 0.5em;
padding: 0 1em;
`;

const StyledIcon = styled(Icon)`
margin-right: 0.5em;
`;


const handleValueByType = (type, value) =>
  type === 'date'
    ? new Date(value)
    : type === 'number'
      ? parseFloat(value)
      : value;

const tagsReducer = (total, { key, type, value, }) => ({ ...total, [key]: handleValueByType(type, value), });


const SearchBar = ({ filters, onFiltersChange, }) => {
  const [ tags, setTags, ] = useState([]);
  const [ suggestionsShown, setSuggestionsShown, ] = useState(false);
  const filterBarRef = useRef();

  const handleTagChangeDone = (value, i) => setTags(prevTags => {
    prevTags[i] = { ...prevTags[i], value, };
    onFiltersChange(prevTags.reduce(tagsReducer, {}));
    return prevTags;
  });

  const handleTagRemove = i => setTags(prevTags => {
    prevTags.splice(i, 1)[0].value
      && onFiltersChange(prevTags.reduce(tagsReducer, {}));
    return prevTags;
  });

  useEffect(() => {
    if (!suggestionsShown) {
      return;
    }
    const filterBar = filterBarRef.current;
    const listener = ({ target, }) =>
      !(filterBar === target || filterBar.contains(target)) && setSuggestionsShown(false);
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [ suggestionsShown, ])

  return (
    <React.Fragment>
      <Bar onClick={() => setSuggestionsShown(true)}>
        <StyledIcon icon={'search'} />
        {tags.map(({ key, ...tag }, i) => (
          <Tag
            key={key}
            {...tag}
            changeDone={value => handleTagChangeDone(value, i)}
            remove={() => handleTagRemove(i)}
          />
        ))}
      </Bar>
      {suggestionsShown && (
        <Bar ref={filterBarRef}>
          {filters
            .filter(({ key, }) => !tags.find(tag => key === tag.key))
            .map(filter => (
              <Tag
                key={filter.key}
                name={filter.name}
                onClick={() => {
                  setTags(prevTags => [ ...prevTags, filter, ]);
                  setSuggestionsShown(false);
                }}
              />
            ))
          }
        </Bar>
      )}
    </React.Fragment>
  );
};

SearchBar.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onFiltersChange: PropTypes.func.isRequired,
};


export default SearchBar;
