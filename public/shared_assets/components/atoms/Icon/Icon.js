import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const StyledSvg = styled.svg`
${({ rotate, }) => rotate && `transform: rotate(${rotate}deg);`}
`;


const Icon = ({ fill, icon, rotate, size, ...rest }) => (
  <Wrapper {...rest}>
    <StyledSvg
      width={size}
      height={size}
      rotate={rotate}
      viewBox={'0 0 24 24'}
    >
      <path
        fill={'none'}
        d={'M0 0h24v24H0z'}
      />
      <path
        fill={fill}
        d={
          (icon === 'error' && 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z')
          || (icon === 'chevron_right' && 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z')
          || (icon === 'edit' && 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z')
          || (icon === 'clear' && 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z')
          || (icon === 'home' && 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z')
          || (icon === 'menu' && 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z')
          || (icon === 'search' && 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z')
          || 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
        }
      />
    </StyledSvg>
  </Wrapper>
);

Icon.defaultProps = {
  icon: 'error',
  size: 24,
  rotate: 0,
};

Icon.propTypes = {
  fill: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  rotate: PropTypes.number,
  size: PropTypes.number,
};


export default Icon;
