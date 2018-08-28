import React from 'react';
import styled from 'styled-components';

import Menu from './Menu';


const Wrapper = styled.div`
background: green;
grid-area: sidebar;
display: flex;
flex-direction: column;`;


class Sidebar extends React.Component {

  render() {
    return (
      <Wrapper>
        <Menu />
      </Wrapper>
    )
  }

}


export default Sidebar;
