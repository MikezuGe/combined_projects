import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';import { Link,
} from 'react-router-dom';

import Sidebar from './Sidebar';


const Header = styled.div`
grid-area: header;
background: ${({ theme, }) => theme.tertiaryColor};
`;

const Main = styled.div`
grid-area: main;
background: ${({ theme, }) => theme.primaryColor};
padding: 1em;
`;


export default class Desktop extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    menuItems: PropTypes.array,
  }

  render () {
    const { children, menuItems } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Sidebar
          primaryMenuItems={[
            { render: () => <Link to={'/home'}>{'Home'}</Link>, },
            { render: () => <Link to={'/budget'}>{'Budget'}</Link>, },
            { render: () => <Link to={'/settings'}>{'Settings'}</Link>, },
          ]}
          secondaryMenuItems={menuItems}
        />
        <Main>
          {children}
        </Main>
      </React.Fragment>
    );
  }

}
