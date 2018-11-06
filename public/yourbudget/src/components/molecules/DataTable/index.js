import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableRow,
  TableCell,
} from '../../atoms';


/**
 * 
 * @typedef {object} rows
 * @property {string} title - Title of a data column
 * @property {string} dataKey - Any keys in the data property objects. Defines the order of columns.
 * @property {func} parseValue - Function that handles each value in a column defined by dataKey. Has no effect if render property is defined.
 * @property {func} render - Render custom content to each cell in a column defined by dataKey
 * @property {func} onClick - Callback for when any cell is clicked in a column defined by dataKey
 */
/**
 * Datatable
 * @param {object} props
 * @param {...rows} props.rows - Properties of cells in each column.
 * @param {object[]} props.data - Array of data objects
 */
const DataTable = ({ rows, data, }) => (
  <Table>
    <TableRow>
      {rows.map(({ title, }, k) => <TableCell key={`header-cell-${k}`} header>{title}</TableCell>) }
    </TableRow>
    {data.map((d, i) => (
      <TableRow key={`row-${i}`}>
        {rows.map(({ dataKey, parseValue, render, onClick, ...rest }, k) =>
          <TableCell
            key={`row-${i}-cell-${k}`}
            onClick={() => onClick(d)}
            {...rest}
          >
            {
              render && render(d)
              || (parseValue && parseValue(d[dataKey]))
              || d[dataKey]
            }
          </TableCell>)
        }
      </TableRow>
    )) }
  </Table>
);


DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};


export default DataTable;
