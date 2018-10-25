import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledRow = styled.tr`
background: cyan;
`;


const TableRow = ({ children, }) => (
  <StyledRow>
    {children}
  </StyledRow>
);


TableRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};


export default TableRow;
