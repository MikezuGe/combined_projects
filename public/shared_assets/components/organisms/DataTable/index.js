import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Table = styled.table`
`;

const Row = styled.tr`
&:nth-child(even) > td {
  background: lightgray;
}
`;

const Cell = styled.td`
background: ${({ theme, header, }) => theme[header ? 'tertiaryColor' : 'secondaryColor']}
${({ header, }) => 'text-align: center;'}
padding: 0.5em;
border-radius: 0.5em;
`;


const DataTable = ({ data, columns, ...rest, }) => (
  <Table>
    <tbody>
      {
        columns.some(({ title, }) => title) && (
          <Row key={'header-row'}>
            {
              columns.map(({ title, }) => (
                <Cell key={`header-${title}`} header>
                  {
                    title
                  }
                </Cell>
              ))
            }
          </Row>
        )
      }
      {
        data.map((d, i) => (
          <Row key={`row-${i}`}>
            {
              columns.map(({ key, render, onClick, ...rest, }) => (
                <Cell
                  key={`cell-${i}-${key}`}
                  onClick={onClick && (() => onClick(d))}
                  {...rest}>
                  {
                    (render && render(d))
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
