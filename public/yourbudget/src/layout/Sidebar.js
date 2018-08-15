import React from 'react';
import { Link, } from 'react-router-dom';
import styled from 'styled-components';


const Container = styled.div`
  background: green;
  display: flex;
  flex-direction: column;
  grid-area: sidebar;
`;


class Sidebar extends React.Component {

  render () {
    return (
      <Container>
        <Link to='/home'>Home</Link>
        <Link to='/budget'>Budget</Link>
        <Link to='/settings'>Settings</Link>
      </Container>
    )
  }

}


export default Sidebar;
