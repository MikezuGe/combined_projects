import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Sidebar = styled.div`
grid-area: sidebar;
background: ${({ theme, }) => theme.secondaryColor};
overflow-x: hidden;
`;

const Menu = styled.ul`
`;

const AlterList = styled.div`
`;

const Item = styled.li`
background: ${({ theme, }) => theme.primaryColor};
margin: 0.5em;
height: 3em;
border-radius: 0.5em;
display: flex;
justify-content: center;
align-items: center;
`;


export default class SideMenu extends React.Component {

  static propTypes = {
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        render: PropTypes.func,
      })
    )
  }
  
  render () {
    const { menuItems, } = this.props;

    const primaryItems = menuItems.filter(({ primary, }) => primary);
    const secondaryItems = menuItems.filter(({ primary, }) => !primary);
    console.log(primaryItems, secondaryItems);
    return (
      <Sidebar>
        <AlterList>
          <Menu>
            {primaryItems.map(({ title, render, ...rest, }, i) => (
              <Item
                key={`item-${i}`}
                {...rest}
              >
                {render
                  ? render()
                  : title
                }
              </Item>
            ))}
          </Menu>
          <Menu>
            {secondaryItems.map(({ title, render, ...rest, }, i) => (
              <Item
                key={`item-${i}`}
                {...rest}
              >
                {render
                  ? render()
                  : title
                }
              </Item>
            ))}
          </Menu>
        </AlterList>
      </Sidebar>
    );
  }

}
