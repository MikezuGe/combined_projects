import React from 'react';
import styled from 'styled-components';


const CenterChild = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;


const Svg = styled.svg`
${({ rotate, }) => rotate ? `transform: rotate(${rotate}deg)` : ''}
`;


const Icon = ({ icon, width, height, ...rest }) => (
  <CenterChild>
    <Svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      {...rest}
    >
      {
        icon === 'chevron_right' ? (
          <React.Fragment>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </React.Fragment>
        ) :
        icon === 'clear' ? (
          <React.Fragment>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </React.Fragment>
        ) :
        icon === 'pencil' ? (
          <React.Fragment>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </React.Fragment>
        ) : 'not found'
      }
    </Svg>
  </CenterChild>
);


export default Icon;
