import React from 'react';
import PropTypes from 'prop-types';


const Table = ({ headers, data, }) => { console.log(headers, data); return(
  <table>
    <tbody>
      <tr>
        {headers.map(h => <td key={h}>{h}</td>)}
      </tr>
      { data.map(d => (
        <tr key={d._id}>
          { headers
            .map(h => h.toLowerCase())
            .map((h, i) => <td key={i}>{d[h]}</td>) }
        </tr>
      )) }
    </tbody>
  </table>
)}


Table.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}


export default Table;
