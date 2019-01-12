import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Sidebar = styled.div`
grid-area: sidebar;
background: ${({ theme, }) => theme.secondaryColor};
overflow-x: hidden;
${({ theme, }) => theme.breakpoints([ 'xs', 'sm', ], `
position: absolute;
width: 40%;
height: 100%;
z-index: 1;
`)}
`;

const AlterList = styled.div`
position: relative;
left: ${({ showPrimary, }) => showPrimary ? 0 : -100}%;
transition: left ${({ theme, }) => theme.animateNormal};
`;

const Menu = styled.ul`
position: absolute;
width: 100%;
left: 100%;
&:first-child {
  left: 0;
}
`;

const Item = styled.li`
background: ${({ theme, }) => theme.primaryColor};
margin: 0.5em;
height: 4em;
border-radius: 0.5em;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`;


const renderMenuItems = ({ title, render, ...rest }, i) => (
  <Item
    key={`item-${i}`}
    {...rest}
  >
    {render
      ? render()
      : title
    }
  </Item>
);


const SideMenu = ({ primaryMenuItems, secondaryMenuItems, }) => {
  const [ showPrimary, setShowPrimary, ] = useState(true);
  const toggleMenu = () => setShowPrimary(!showPrimary);
  return (
    <Sidebar>
      <AlterList showPrimary={showPrimary}>
        {primaryMenuItems && (
          <Menu>
            {secondaryMenuItems && (
              <Item onClick={toggleMenu}>
                {'Change menu'}
              </Item>
            )}
            {primaryMenuItems.map(renderMenuItems)}
          </Menu>
        )}
        {secondaryMenuItems && (
          <Menu>
            <Item onClick={toggleMenu}>
              {'Change menu'}
            </Item>
            {secondaryMenuItems.map(renderMenuItems)}
          </Menu>
        )}
      </AlterList>
    </Sidebar>
  );
};

const propTypesMenu = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    render: PropTypes.func,
  })
);

SideMenu.propTypes = {
  primaryMenuItems: propTypesMenu.isRequired,
  secondaryMenuItems: propTypesMenu,
};


export default SideMenu;
