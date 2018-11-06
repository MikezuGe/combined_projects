import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const HeaderCell = styled.td`
text-align: center;
`;

const DataCell = styled.td`
padding: 0.5em;
border-radius: 0.5em;
`;


/**
 * Tablecell
 * @param {object} props
 * @param {bool} props.header - Set this property to display a headercell
 * @example
 * <TableCell
 *  header
 * >
 *   {'Content'}
 * </TableCell>
 */
const TableCell = ({ header, children, ...rest }) => (
  header
  ? (
    <HeaderCell {...rest}>
      {children}
    </HeaderCell>
  ) : (
    <DataCell {...rest}>
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
