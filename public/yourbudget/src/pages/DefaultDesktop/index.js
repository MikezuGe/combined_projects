import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';

import { Desktop, } from '../../../../shared_assets/components/organisms';


const DefaultDesktop = ({ children, secondaryMenuItems, }) => (
  <Desktop
    primaryMenuItems={[
      { render: () => <Link to={'/home'}>{'Home'}</Link>, },
      { render: () => <Link to={'/budget'}>{'Budget'}</Link>, },
      { render: () => <Link to={'/settings'}>{'Settings'}</Link>, },
    ]}
    secondaryMenuItems={secondaryMenuItems}
  >
    {children}
  </Desktop>
);


DefaultDesktop.propTypes = {
  children: PropTypes.element.isRequired,
  secondaryMenuItems: PropTypes.array,
};


export default DefaultDesktop;
