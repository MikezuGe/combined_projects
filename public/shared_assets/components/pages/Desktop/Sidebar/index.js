import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Sidebar = styled.div`
grid-area: sidebar;
background: ${({ theme, }) => theme.secondaryColor};
overflow-x: hidden;
`;

const AlterList = styled.div`
position: relative;
left: ${({ showPrimary, }) => showPrimary ? 0 : -100}%;
transition: left 200ms;
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
`;


const renderMenuItems = ({ title, render, ...rest, }, i) => (
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


const propTypesMenu = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    render: PropTypes.func,
  })
);


export default class SideMenu extends React.Component {

  static propTypes = {
    primaryMenuItems: propTypesMenu.isRequired,
    secondaryMenuItems: propTypesMenu,
  }

  state = {
    showPrimary: true,
  }
  
  render () {
    const { primaryMenuItems, secondaryMenuItems, } = this.props;
    const { showPrimary, } = this.state;
    return (
      <Sidebar>
        <AlterList showPrimary={showPrimary}>
          {primaryMenuItems && (
            <Menu>
              {secondaryMenuItems && (
                <Item onClick={() => this.setState({ showPrimary: !showPrimary, })}>
                  {'Change menu'}
                </Item>
              )}
              {primaryMenuItems.map(renderMenuItems)}
            </Menu>
          )}
          {secondaryMenuItems && (
            <Menu>
              <Item onClick={() => this.setState({ showPrimary: !showPrimary, })}>
                {'Change menu'}
              </Item>
              {secondaryMenuItems.map(renderMenuItems)}
            </Menu>
          )}
        </AlterList>
      </Sidebar>
    );
  }

}
