import React, { useState, useEffect, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Icon, } from '../../atoms';


const Wrapper = styled.span`
background: lightgray;
cursor: pointer;
height: 2em;
line-height: 2em;
min-width: 3em;
${({ remove, }) => `
border-radius: ${remove ? '1em 0 0 1em' : '1em'};
margin: ${remove ? '0 0 0 0.5em' : '0 0.5em'};
&:first-child { margin: ${remove ? '0' : '0 0.5em 0 0'}; }
&:last-child { margin: ${remove ? '0' : '0 0 0 0.5em'}; }
padding: ${remove ? '0 0.5em 0 1em' : '0 1em'};
`}
`;

const StyledInput = styled.input`
border: none;
`;

const StyledIcon = styled(Icon)`
background: lightgray;
border-left: 1px solid gray;
border-radius: 0 1em 1em 0;
cursor: pointer;
height: 2em;
width: 2em;
`;


const Tag = ({ name, value: defaultValue, onClick, changeDone, remove, }) => {
  const [ value, setValue, ] = useState(defaultValue);
  const [ editing, setEditing, ] = useState(!!changeDone);

  const handleChangeDone = () => {
    value
      ? changeDone(value)
      : remove();
    setEditing(false);
  };

  useEffect(() => {
    if (!editing) {
      return;
    }
    const listener = ({ key, keyCode, }) => {
      (handleChangeDone && (key === 'Enter' || keyCode === 13) && handleChangeDone())
      || (remove && (key === 'Escape' || keyCode === 27) && remove());
    };
    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, [ editing, value, ]);

  return (
    <React.Fragment>
      <Wrapper
        onClick={onClick ? onClick : !editing ? (() => setEditing(true)) : undefined}
        remove={!!remove}
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
              onBlur={handleChangeDone}
            />
          )
          : (
            <span>
              {value}
            </span>
          )}
      </Wrapper>
      {remove && (
        <StyledIcon
          size={16}
          icon={'clear'}
          onClick={remove}
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
  changeDone: PropTypes.func,
  remove: PropTypes.func,
};


export default Tag;
