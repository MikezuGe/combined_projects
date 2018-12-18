import React from 'react';
import PropTypes from 'prop-types';

import DefaultDesktop from '../DefaultDesktop';
import { DataTable, } from '../../../../shared_assets/components/organisms';


import FilterBar from '../../forms/FilterBar';


const ListDesktop = ({ loading, error, data, columns, filters, onFiltersChange, secondaryMenuItems, }) => (
  <DefaultDesktop secondaryMenuItems={secondaryMenuItems}>
    <React.Fragment>
      {filters && (
        <FilterBar
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      )}
      {
        (loading && <div>{'Loading'}</div>)
        || (error && <div>{`Error: ${error}`}</div>)
        || (!data || !data.length && <div>{'No data found!'}</div>)
        || (
          <DataTable
            columns={columns}
            data={data}
          />
        )
      }
    </React.Fragment>
  </DefaultDesktop>
);

ListDesktop.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array,
  filters: PropTypes.objectOf(PropTypes.string),
  onFiltersChange: PropTypes.func,
  secondaryMenuItems: PropTypes.array,
};


export default ListDesktop;
