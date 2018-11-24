import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';

import { Desktop, } from '../../../../shared_assets/components/organisms';


const DefaultDesktop = ({ children, secondaryMenuItems, }) => (
  <Desktop
    primaryMenuItems={[
      { render: function home () { return <Link to={'/home'}>{'Home'}</Link>; }, },
      { render: function budget () { return <Link to={'/budget'}>{'Budget'}</Link>; }, },
      { render: function settings () { return <Link to={'/settings'}>{'Settings'}</Link>; }, },
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
