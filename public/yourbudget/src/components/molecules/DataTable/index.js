import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableRow,
  TableCell,
} from '../../atoms';


const DataTable = ({ rows, data, }) => (
  <Table>
    <TableRow>
      { rows.map(({ title, }, k) => <TableCell key={`header-cell-${k}`} header>{title}</TableCell>) }
    </TableRow>
    { data.map((d, i) => (
      <TableRow key={`row-${i}`}>
        { rows.map(({ dataKey, parseValue, render, onClick, ...rest }, k) =>
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
