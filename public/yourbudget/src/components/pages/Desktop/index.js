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


class Desktop extends React.Component {

  render () {
    return (
      <React.Fragment>
        <Header />
        <Menu />
        <MainWrapper>
          {this.props.children}
        </MainWrapper>
        <Modal/>
        <Toaster/>
      </React.Fragment>
    );
  }

}


Desktop.propTypes = {
  menuItems: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};


export default Desktop;
