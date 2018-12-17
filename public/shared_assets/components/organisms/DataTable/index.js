import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Table = styled.table`
`;

// NEEDS A THEME COLOR HERE
const Row = styled.tr`
&:nth-child(even) > td {
  background: lightgray;
}
`;

const Cell = styled.td`
background: ${({ theme, header, }) => theme[header ? 'tertiaryColor' : 'secondaryColor']}
padding: 0.5em;
border-radius: 0.5em;
${({ header, }) => header && `
text-align: center;
cursor: pointer;
`}
`;


const DataTable = ({ data, columns, ...rest }) => {
  const [ sortKey, setSortKey, ] = useState('');
  const [ reversedSort, setReversedSort, ] = useState(false);
  const sorter = (() => {
    if (!sortKey) {
      return;
    }
    const sortBy = columns.find(({ key, }) => key && key === sortKey);
    const sortFunc = (sortBy && sortBy.sort) || ((a, b) => ((a < b) && -1) || ((a > b) && 1) || 0);
    return reversedSort
      ? (a, b) => -sortFunc(a[sortKey], b[sortKey])
      : (a, b) => sortFunc(a[sortKey], b[sortKey]);
  })();
  return (
    <Table {...rest}>
      <tbody>
        {
          columns.some(({ title, }) => title) && (
            <Row key={'header-row'}>
              {
                columns.map(({ key, title, }) => (
                  <Cell
                    key={`header-${title}`}
                    header
                    onClick={key && (() => {
                      if (key === sortKey) {
                        setReversedSort(!reversedSort);
                      } else {
                        setSortKey(key);
                        setReversedSort(false);
                      }
                    })}
                  >
                    {title}
                  </Cell>
                ))
              }
            </Row>
          )
        }
        {
          (sorter ? data.sort(sorter) : data).map((d, i) => (
            <Row key={`row-${i}`}>
              {
                columns.map(({ key, render, onClick, }, k) => (
                  <Cell
                    key={`cell-${i}-${k}`}
                    onClick={onClick && (() => onClick(d))}
                  >
                    {
                      (render && render(key ? d[key] : d))
                      || d[key]
                    }
                  </Cell>
                ))
              }
            </Row>
          ))
        }
      </tbody>
    </Table>
  );
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
    render: PropTypes.func,
    onClick: PropTypes.func,
  })).isRequired,
};


export default DataTable;
