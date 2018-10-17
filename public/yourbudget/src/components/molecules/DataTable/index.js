import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableRow,
  TableCell,
} from '../../atoms';

import { firstLetterToUpperCase, } from '../../../utility';


const DataTable = ({ rows, data, }) => {
  return (
    <Table>
      <TableRow>
        { rows.map(({ title, }) => <TableCell key={title} header>{title}</TableCell>) }
      </TableRow>
      { data.map((d, i) => (
        <TableRow key={`row-${i}`}>
          { rows.map(({ title, dataKey, render, ...props }) =>
            <TableCell
              key={`${dataKey}-${i}`}
              {...props}
            >
              {
                render && render(props)
                || d[dataKey]
              }
            </TableCell>)
          }
        </TableRow>
      )) }
    </Table>
  );
}

DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};


export default DataTable;
