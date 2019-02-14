import React, { useState, useEffect, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Icon, } from '..';


const Wrapper = styled.span`
background: lightgray;
height: 2em;
line-height: 2em;
min-width: 3em;
${({ removeClick, }) => `
border-radius: ${removeClick ? '1em 0 0 1em' : '1em'};
margin: ${removeClick ? '0 0 0 0.5em' : '0 0.5em'};
&:first-child { margin: ${removeClick ? '0' : '0 0.5em 0 0'}; }
&:last-child { margin: ${removeClick ? '0' : '0 0 0 0.5em'}; }
padding: ${removeClick ? '0 0.5em 0 1em' : '0 1em'};
`}
`;

const StyledInput = styled.input`
border: none;
`;

const StyledIcon = styled(Icon)`
background: lightgray;
border-left: 1px solid gray;
border-radius: 0 1em 1em 0;
height: 2em;
width: 2em;
`;


const Tag = ({ name, value: defaultValue, onClick, onChangeDone, removeClick, }) => {
  const [ value, setValue, ] = useState(defaultValue);
  const [ editing, setEditing, ] = useState(!!onChangeDone);

  const handleEditDone = () => {
    value
      ? onChangeDone(value)
      : removeClick();
    setEditing(false);
  };

  useEffect(() => {
    if (!editing) {
      return;
    }
    const listener = ({ key, keyCode, }) => {
      ((key === 'Enter' || keyCode === 13) && handleEditDone())
      || ((key === 'Escape' || keyCode === 27) && removeClick());
    };
    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, [ editing, value, ]);

  return (
    <React.Fragment>
      <Wrapper
        onClick={onClick ? onClick : !editing ? (() => setEditing(true)) : undefined}
        removeClick={!!removeClick}
      >
        <span>
          {`${name}${editing || value ? ': ' : ''}`}
        </span>
        {editing
          ? (
            <StyledInput
              autoFocus
              value={value}
              onChange={e => setValue(e.target.value)}
              onBlur={handleEditDone}
            />
          )
          : (
            <span>
              {value}
            </span>
          )}
      </Wrapper>
      {removeClick && (
        <StyledIcon
          size={16}
          icon={'clear'}
          onClick={removeClick}
        />
      )}
    </React.Fragment>
  );
};

Tag.defaultProps = {
  value: '',
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onClick: PropTypes.func,
  onChangeDone: PropTypes.func,
  removeClick: PropTypes.func,
};


export default Tag;
