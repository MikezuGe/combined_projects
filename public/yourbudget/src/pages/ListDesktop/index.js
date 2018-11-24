import React from 'react';
import PropTypes from 'prop-types';

import DefaultDesktop from '../DefaultDesktop';
import { DataTable, } from '../../../../shared_assets/components/organisms';


const ListDesktop = ({ loading, error, data, columns, secondaryMenuItems, }) => (
  <DefaultDesktop
    secondaryMenuItems={secondaryMenuItems}
  >
    {
      (loading && <div>{'Loading'}</div>)
      || (error && <div>{`Error: ${error}`}</div>)
      || (!data && <div>{'No data found!'}</div>)
      || (
        <DataTable
          columns={columns}
          data={data}
        />
      )
    }
  </DefaultDesktop>
);


ListDesktop.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array,
  secondaryMenuItems: PropTypes.array,
};


export default ListDesktop;
