import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, } from 'react-router-dom';

import { Desktop, } from '../../../../shared_assets/components/organisms';


const DefaultDesktop = ({ children, history, secondaryMenuItems, }) => (
  <Desktop
    primaryMenuItems={[
      {
        title: 'Home',
        onClick: () => history.replace('/home'),
      }, {
        title: 'Budget',
        onClick: () => history.replace('/budget'),
      }, {
        title: 'Settings',
        onClick: () => history.replace('/settings'),
      },
    ]}
    secondaryMenuItems={secondaryMenuItems}
  >
    {children}
  </Desktop>
);


DefaultDesktop.propTypes = {
  children: PropTypes.element.isRequired,
  history: PropTypes.object.isRequired,
  secondaryMenuItems: PropTypes.array,
};


export default withRouter(DefaultDesktop);
