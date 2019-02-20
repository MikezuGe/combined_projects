import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, } from 'react-router-dom';

import { Desktop, } from '../../../../shared_assets/components/organisms';


const DefaultDesktop = ({ children, history, secondaryMenuItems, }) => (
  <Desktop
    primaryMenuItems={[
      {
        title: 'Home',
        onClick: () => history.push('/home'),
      }, {
        title: 'Budget',
        onClick: () => history.push('/budget'),
      }, {
        title: 'Graph',
        onClick: () => history.push('/graph'),
      }, {
        title: 'Settings',
        onClick: () => history.push('/settings'),
      },
    ]}
    secondaryMenuItems={secondaryMenuItems}
  >
    {children}
  </Desktop>
);

DefaultDesktop.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  secondaryMenuItems: PropTypes.array,
};


export default withRouter(DefaultDesktop);
