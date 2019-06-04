import React from 'react';
import PropTypes from 'prop-types';

import DefaultDesktop from './DefaultDesktop';


const GraphDesktop = ({ secondaryMenuItems, children, }) => (
  <DefaultDesktop secondaryMenuItems={secondaryMenuItems}>
    <>
      <div>{'Graphdesktop'}</div>
      {children()}
    </>
  </DefaultDesktop>
);

GraphDesktop.propTypes = {
  secondaryMenuItems: PropTypes.array,
  children: PropTypes.func.isRequired,
};


export default GraphDesktop;
