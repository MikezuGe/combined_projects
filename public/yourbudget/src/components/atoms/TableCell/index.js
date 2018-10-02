import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const HeaderCell = styled.td`

`;

const DataCell = styled.td`

`;


const TableCell = ({ header, children, }) => 
header ? (
  <HeaderCell>
    {children}
  </HeaderCell>
) : (
  <DataCell>
    {children}
  </DataCell>
);


TableCell.propTypes = {
  header: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
};


export default TableCell;
