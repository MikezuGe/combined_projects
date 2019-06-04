import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header/Header';
import SideBar from './SideBar/SideBar';


const Main = styled.div`
grid-area: main;
background: ${({ theme, }) => theme.primaryColor};
padding: 1em;
`;


const Desktop = ({ children, primaryMenuItems, secondaryMenuItems, }) => (
  <>
    <Header />
    <SideBar
      primaryMenuItems={primaryMenuItems}
      secondaryMenuItems={secondaryMenuItems}
    />
    <Main>
      {children}
    </Main>
  </>
);

Desktop.propTypes = {
  children: PropTypes.element,
  primaryMenuItems: PropTypes.array.isRequired,
  secondaryMenuItems: PropTypes.array,
};


export default Desktop;
