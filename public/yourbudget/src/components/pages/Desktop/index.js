import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Menu from './Menu';
import Header from './Header';
import { Toaster, Modal, } from '../../organisms';


const MainWrapper = styled.div`
  grid-area: main;
  background: lightgray;
`;


const Desktop = ({ children, secondaryMenuItems, modalViews }) => (
  <React.Fragment>
    <Header />
    <Menu secondaryMenuItems={secondaryMenuItems} />
    <MainWrapper>
      { children }
    </MainWrapper>
    <Modal modalViews={modalViews} />
    <Toaster />
  </React.Fragment>
);


Desktop.propTypes = {
  secondaryMenuItems: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  modalViews: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};


export default Desktop;
