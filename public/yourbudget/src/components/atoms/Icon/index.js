import React from 'react';
import styled from 'styled-components';


const Svg = styled.svg`
${({ rotate, }) => rotate ? `transform: rotate(${rotate}deg)` : ''}
`;


const Icon = ({ icon, width, height, ...rest }) => (
  icon === 'chevron_right' && (
    <Svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      {...rest}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </Svg>
  )
);


export default Icon;
