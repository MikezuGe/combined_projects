import React from 'react';
import styled from 'styled-components';

import { Menu, } from 'components';


const Container = styled.div`
background: green;
grid-area: sidebar;
display: flex;
flex-direction: column;
`;


class Sidebar extends React.Component {

  render() {
    return (
      <Container>
        <Menu />
      </Container>
    )
  }

}


export default Sidebar;
