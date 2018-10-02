import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableRow,
  TableCell,
} from '../../atoms';


const DataTable = ({ headers, data, }) => (
  <Table>
    <TableRow>
      { headers.map(h => <TableCell key={h} header>{h}</TableCell>) }
    </TableRow>
    { data.map((d, i) => (
      <TableRow key={i}>
        { headers.map(h => h.toLowerCase())
          .map(h => <TableCell key={d[h]}>{d[h]}</TableCell>) }
      </TableRow>
    )) }
  </Table>
);


DataTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};


export default DataTable;
