import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, } from 'react-router-dom';
import styled from 'styled-components';


const Wrapper = styled.div`
background: green;
grid-area: sidebar;
overflow-X: hidden;
`;

const InnerWrapper = styled.div`
position: relative;
left: ${({ primary, }) => primary ? 0 : -100}%;
display: flex;
width: 200%;
transition: left 250ms;
@keyframes animatein {
  from { left: 0%; }
}
animation: animatein 250ms;
`;

const StyledList = styled.ul`
width: 100%;
display: inline;
list-style: none;
padding: 0.5rem;
`;

const ListItem = styled(Link)`
background: linear-gradient(to right, white, pink 20%);
display: block;
text-decoration: none;
border: 2px solid black;
border-radius: 5px;
margin: 0.5rem 0;
padding: 0.5rem;
&:first-child {
  margin-top: 0;
}
&:last-child {
  margin-bottom: 0;
}
`;


class Menu extends React.Component {

  static propTypes = {
    secondaryMenuItems: PropTypes.array,
  }

  state = {
    primary: false,
  }

  togglePrimary = () => this.setState({ primary: !this.state.primary });

  render () {
    const { togglePrimary, props: { secondaryMenuItems, }, state: { primary, }, } = this;
    return (
      <Wrapper>
        <InnerWrapper primary={primary}>
          <StyledList>
            <ListItem to='#' onClick={togglePrimary}>Change menu</ListItem>
            <ListItem to='/home'>Home</ListItem>
            <ListItem to='/budget'>Budget</ListItem>
            <ListItem to='/settings'>Settings</ListItem>
          </StyledList>
          <StyledList>
            <ListItem to='#' onClick={togglePrimary}>Change menu</ListItem>
            { secondaryMenuItems && (
              secondaryMenuItems.map((item, i) => (
                <ListItem
                  key={i}
                  to='#'
                  onClick={item.onClick}
                >
                  {item.text}
                </ListItem>
              ))
            )}
          </StyledList>
        </InnerWrapper>
      </Wrapper>
    );
  }

}


export default withRouter(Menu);
