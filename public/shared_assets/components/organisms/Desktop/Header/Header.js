import React from 'react';
import styled from 'styled-components';


const StyledHeader = styled.div`
grid-area: header;
background: ${({ theme, }) => theme.tertiaryColor};
`;


const Header = () => (
  <StyledHeader>

  </StyledHeader>
);


export default Header;
