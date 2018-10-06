import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableRow,
  TableCell,
} from '../../atoms';

import { firstLetterToUpperCase, } from '../../../utility';


const DataTable = ({ headerFilter, headerMap, data, }) => {
  const headers = !headerFilter.length
    ? Object.keys(data[0])
    : Object.keys(data[0])
      .filter(h => typeof headerFilter === 'object'
        ? !headerFilter.includes(h)
        : headerFilter !== h
      );
  const capitalHeaders = !headerMap
    ? headers.map(firstLetterToUpperCase)
    : headers.map(h => headerMap[h] || h).map(firstLetterToUpperCase);
  return (
    <Table>
      <TableRow>
        { capitalHeaders.map(h => <TableCell key={h} header>{h}</TableCell>) }
      </TableRow>
      { data.map((d, i) => (
        <TableRow key={i}>
          { headers.map(h => <TableCell key={d[h]}>{d[h]}</TableCell>) }
        </TableRow>
      )) }
    </Table>
  );
}

DataTable.propTypes = {
  headerFilter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  headerMap: PropTypes.object,
  data: PropTypes.array.isRequired,
};


export default DataTable;
