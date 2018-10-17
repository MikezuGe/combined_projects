import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const HeaderCell = styled.td`

`;

const DataCell = styled.td`
background: cyan;
padding: 0.5em;
border-radius: 0.5em;
`;


const TableCell = ({ header, children, }) => (
  header
  ? (
    <HeaderCell>
      {children}
    </HeaderCell>
  ) : (
    <DataCell>
      {children}
    </DataCell>
  )
);


TableCell.propTypes = {
  header: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
};


export default TableCell;
