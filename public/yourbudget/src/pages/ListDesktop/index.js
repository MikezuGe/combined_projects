import React from 'react';
import PropTypes from 'prop-types';

import DefaultDesktop from '../DefaultDesktop';
import { DataTable, } from '../../../../shared_assets/components/organisms';
import { Searchbar, } from '../../../../shared_assets/components/molecules';


const ListDesktop = ({ loading, error, data, columns, filters, onFiltersChange, secondaryMenuItems, }) => (
  <DefaultDesktop secondaryMenuItems={secondaryMenuItems}>
    <React.Fragment>
      {filters && (
        <Searchbar
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
  filters: PropTypes.arrayOf(PropTypes.any),
  onFiltersChange: PropTypes.func,
  secondaryMenuItems: PropTypes.array,
};


export default ListDesktop;
