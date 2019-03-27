import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Icon, } from '../../atoms';


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
${({ header, center, clickable, }) => `
${(header || center) ? 'text-align: center;': ''}
${(header || clickable) ? 'cursor: pointer;': ''}
`}
`;

const Header = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const StyledIcon = styled(Icon)`
width: 20px;
`;

const Title = styled.div`
margin: 0 20px 0 ${({ spaceLeft, }) => spaceLeft ? '20' : '0'}px;
`;


const sortNumbers = (a, b) => a === b ? 0 : a < b ? -1 : 1;
const sortStrings = (a, b) => a.localeCompare(b);


const DataTable = ({ data, columns, ...rest }) => {
  const [ sortKey, setSortKey, ] = useState('');
  const [ reversedSort, setReversedSort, ] = useState(false);

  const sorter = sortKey && (
    typeof data[0][sortKey] === 'string'
      ? (reversedSort
        ? (a, b) => -sortStrings(a[sortKey], b[sortKey])
        : (a, b) => sortStrings(a[sortKey], b[sortKey])
      )
      : (reversedSort
        ? (a, b) => -sortNumbers(a[sortKey], b[sortKey])
        : (a, b) => sortNumbers(a[sortKey], b[sortKey])
      )
  );

  return (
    <Table {...rest}>
      {columns.some(({ title, }) => title) && (
        <thead>
          <Row key={'header-row'}>
            {columns.map(({ key, title, }) => (
              <Cell
                key={`header-${title}`}
                header
                onClick={key && (key === sortKey
                  ? (() => setReversedSort(!reversedSort))
                  : (() => (setSortKey(key), setReversedSort(false))))
                }
              >
                <Header>
                  {key === sortKey && (
                    <StyledIcon
                      size={16}
                      icon={'chevron_right'}
                      rotate={reversedSort ? -90 : 90}
                    />
                  )}
                  <Title spaceLeft={key !== sortKey}>{title}</Title>
                </Header>
              </Cell>
            ))}
          </Row>
        </thead>
      )}
      <tbody>
        {(sorter ? data.sort(sorter) : data).map((d, i) => (
          <Row key={`row-${i}`}>
            {columns.map(({ key, render, onClick, }, k) => (
              <Cell
                key={`cell-${i}-${k}`}
                onClick={onClick && (() => onClick(d))}
                clickable={!!onClick}
                center={!!render}
              >
                {
                  (render && render(key ? d[key] : d))
                  || d[key]
                }
              </Cell>
            ))}
          </Row>
        ))}
      </tbody>
    </Table>
  );
};

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
