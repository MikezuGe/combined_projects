import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledTable = styled.table`

`;


const Table = ({ children, }) => (
  <StyledTable>
    <tbody>
      {children}
    </tbody>
  </StyledTable>
);


Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};


export default Table;
