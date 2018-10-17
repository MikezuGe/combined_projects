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
      { rows.map(({ title, }) => <TableCell key={title} header>{title}</TableCell>) }
    </TableRow>
    { data.map((d, i) => (
      <TableRow key={`row-${i}`}>
        { rows.map(({ dataKey, render, ...rest }) =>
          <TableCell
            key={`${dataKey}-${i}`}
            {...rest}
          >
            {
              render && render({ dataKey, dataValue: d[dataKey], rowNum: i, ...rest })
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
