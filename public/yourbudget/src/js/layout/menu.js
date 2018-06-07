import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';

import 'css/layout/menu.css';

import firstLetterToUpperCase from 'js/utility/firstlettertouppercase';


const createMenuItem = (link, index) => [
  <Link key={index} className={'menuitem'} to={link}>
    <div className={'menuitemtext'}>{firstLetterToUpperCase(link)}</div>
    <img className={'menuitemimage'} src={'http://www.theatre-centre.co.uk/images/shows-projects/media/thumbs/Sabrina.jpeg'}/>
  </Link>,
];


class Menu extends Component {

  render () {
    const links = [ 'home', 'budget', 'options', 'profile', ];
    return (
      <div className={'menu'}>
        { links.map(createMenuItem) }
      </div>
    );
  }

}


Menu.propTypes = {
  history: PropTypes.object.isRequired,
};


export default Menu;
