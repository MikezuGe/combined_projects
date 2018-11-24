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


export default class Desktop extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    primaryMenuItems: PropTypes.array.isRequired,
    secondaryMenuItems: PropTypes.array,
  }

  render () {
    const { children, primaryMenuItems, secondaryMenuItems, } = this.props;
    return (
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
  }

}
