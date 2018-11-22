import React from 'react';
import styled from 'styled-components';


const Header = styled.div`
grid-area: header;
background: ${({ theme, }) => theme.tertiaryColor};
`;

const Sidebar = styled.div`
grid-area: sidebar;
background: ${({ theme, }) => theme.secondaryColor};
`;

const Main = styled.div`
grid-area: main;
background: ${({ theme, }) => theme.primaryColor};
padding: 1em;
`;


export default class Desktop extends React.Component {

  render () {
    const { children, } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Sidebar />
        <Main>
          {children}
        </Main>
      </React.Fragment>
    );
  }

}
