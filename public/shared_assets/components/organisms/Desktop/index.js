import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';


const Main = styled.div`
grid-area: main;
background: ${({ theme, }) => theme.primaryColor};
padding: 1em;
`;


const Desktop = ({ children, primaryMenuItems, secondaryMenuItems, }) => (
  <React.Fragment>
    <Header />
    <Sidebar
      primaryMenuItems={primaryMenuItems}
      secondaryMenuItems={secondaryMenuItems}
    />
    <Main>
      {children}
    </Main>
  </React.Fragment>
);

Desktop.propTypes = {
  children: PropTypes.element,
  primaryMenuItems: PropTypes.array.isRequired,
  secondaryMenuItems: PropTypes.array,
};


export default Desktop;
