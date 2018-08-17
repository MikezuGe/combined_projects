import React from 'react';
import { Link, withRouter, } from 'react-router-dom';
import styled from 'styled-components';


const Wrapper = styled.div`
flex: 1 1 100%;
position: relative;
overflow: hidden;
`;


const styledUl = styled.ul`
position: absolute;
display: flex;
flex-direction: column;
width: 100%;
transition: left 0.5s ease-out;
list-style: none;
`;


const PrimaryMenu = styled(styledUl)`
left: ${props => props.primary ? '0' : '-100'}%;
background: lime;
`;


const SecondaryMenu = styled(styledUl)`
left: ${props => props.primary ? '100' : '0'}%;
background: yellow;
`;


const StyledMenuItem = styled.li`
padding: 2.5px 5px;
&:first-child {
  padding-top: 5px;
}
&:last-child {
  padding-bottom: 5px;
}
`;


const MenuTogglerItem = styled.li`
display: flex;
justify-content: center;
align-items: center;
min-height: 48px;
cursor: pointer;
`;


const StyledLink = styled(Link)`
background: white;
display: flex;
align-items: center;
padding-left: 16px;
border-radius: 16px;
min-height: 32px;
text-decoration: none;
&:hover {
  background: purple;
}
`;


class Menu extends React.Component {

  state = {
    primary: true,
  }

  toggleMenu(isPrimary) {
    this.setState({ primary: isPrimary, });
  }

  render() {
    return (
      <Wrapper>
        <PrimaryMenu primary={this.state.primary}>
          <MenuTogglerItem onClick={() => this.toggleMenu(false)}>To some menu</MenuTogglerItem>
          <StyledMenuItem><StyledLink to='/home'>Home</StyledLink></StyledMenuItem>
          <StyledMenuItem><StyledLink to='/budget'>Budget</StyledLink></StyledMenuItem>
          <StyledMenuItem><StyledLink to='/settings'>Settings</StyledLink></StyledMenuItem>
        </PrimaryMenu>
        <SecondaryMenu primary={this.state.primary}>
          <MenuTogglerItem onClick={() => this.toggleMenu(true)}>To main menu</MenuTogglerItem>
          <StyledMenuItem><StyledLink to='/home'>Home</StyledLink></StyledMenuItem>
        </SecondaryMenu>
      </Wrapper>
    );
  }

}


export default withRouter(Menu);
