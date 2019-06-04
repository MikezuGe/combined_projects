import React from 'react';
import PropTypes from 'prop-types';

import DefaultDesktop from './DefaultDesktop';
import { DataTable, SearchBar, } from 'components/organisms';


const ListDesktop = ({ loading, error, data, columns, filters, onFiltersChange, secondaryMenuItems, }) => (
  <DefaultDesktop secondaryMenuItems={secondaryMenuItems}>
    <>
      {filters && (
        <SearchBar
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      )}
      {data && data.length
        ? (
          <DataTable
            columns={columns}
            data={data}
          />
        )
        : !loading && <div>{'No data found!'}</div>
      }
      {loading && <div>{'Loading'}</div>}
      {error && <div>{`Error: ${error}`}</div>}
    </>
  </DefaultDesktop>
);

ListDesktop.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array,
  filters: PropTypes.arrayOf(PropTypes.any),
  onFiltersChange: PropTypes.func,
  secondaryMenuItems: PropTypes.array,
};

ListDesktop.defaultProps = {
  loading: true,
  error: false,
  data: [],
};


export default ListDesktop;
