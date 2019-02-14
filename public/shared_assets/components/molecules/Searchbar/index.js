import React, { useState, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Icon, Tag, } from '../../atoms';


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

const tagsReducer = (total, { key, type, value, }) => (total[key] = handleValueByType(type, value), total);


const Searchbar = ({ filters, onFiltersChange, }) => {
  const [ tags, setTags, ] = useState([]);

  const handleTagChangeDone = (value, i) => setTags(prevTags => {
    prevTags[i] = { ...prevTags[i], value, };
    onFiltersChange(prevTags.reduce(tagsReducer, {}));
    return prevTags;
  });
  const handleTagRemoveClick = i => setTags(prevTags => {
    prevTags.splice(i, 1);
    onFiltersChange(prevTags.reduce(tagsReducer, {}));
    return prevTags;
  });

  return (
    <React.Fragment>


      <Bar>
        <StyledIcon icon={'search'} />
        {tags.map(({ key, ...tag }, i) => (
          <Tag
            key={key}
            {...tag}
            onChangeDone={value => handleTagChangeDone(value, i)}
            removeClick={() => handleTagRemoveClick(i)}
          />
        ))}
      </Bar>


      <Bar>
        {filters
          .filter(({ key, }) => !tags.find(tag => key === tag.key))
          .map(filter => (
            <Tag
              key={filter.key}
              name={filter.name}
              onClick={() => setTags(prevTags => [ ...prevTags, filter, ])}
            />
          ))
        }
      </Bar>


    </React.Fragment>
  );
};

Searchbar.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onFiltersChange: PropTypes.func.isRequired,
};


export default Searchbar;
