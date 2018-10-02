import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledTable = styled.tr`

`;


const Table = ({ children, }) => (
  <StyledTable>
    {children}
  </StyledTable>
);


Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};


export default Table;
