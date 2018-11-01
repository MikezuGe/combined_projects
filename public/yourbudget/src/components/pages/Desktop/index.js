import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Menu from './Menu';
import Header from './Header';


const MainWrapper = styled.div`
  grid-area: main;
  background: lightgray;
`;


const Desktop = ({ children, secondaryMenuItems, }) => (
  <React.Fragment>
    <Header />
    <Menu secondaryMenuItems={secondaryMenuItems} />
    <MainWrapper>
      { children }
    </MainWrapper>
  </React.Fragment>
);


Desktop.propTypes = {
  secondaryMenuItems: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};


export default Desktop;
