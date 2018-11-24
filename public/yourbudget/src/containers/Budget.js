import React from 'react';
import PropTypes from 'prop-types';
import { adopt, } from 'react-adopt';

import { Query, } from '../../../shared_assets/components/GraphQL';
import { Icon, } from '../../../shared_assets/components/atoms';

import { ListDesktop, } from '../pages';
import { GET_FUNDS, CREATE_FUNDS, UPDATE_FUNDS, REMOVE_FUNDS, } from '../queries';


const Q = ({ render, }) => (
  <Query
    query={GET_FUNDS}
    onError={err => {
      // TOAST HERE
      console.warn(err); // eslint-disable-line
    }}
  >
    {({
      loading: queryLoading,
      error: queryError,
      refetch,
      data,
    }) => (
      render({
        queryLoading,
        queryError,
        refetch,
        data,
      })
    )}
  </Query>
);


Q.propTypes = {
  render: PropTypes.func,
};


const Composed = adopt({
  query: Q,
});


export default class Budget extends React.Component {

  render () {
    return (
      <Composed>
        {({
          query: { queryLoading, queryError, data, },
        }) => (
          <ListDesktop
            secondaryMenuItems={[
              {
                title: 'Titteli',
              }, {
                title: 'Toinen',
              }, {
                title: 'Hehheh',
                render: () => <div>{'Rendered'}</div>
              }
            ]}
            loading={queryLoading}
            error={queryError}
            data={data}
            columns={[
              {
                key: 'name',
                title: 'Name',
              }, {
                key: 'amount',
                title: 'Amount',
              }, {
                key: 'isIncome',
                title: 'Direction',
                render: isIncome => (
                  <Icon
                    icon={'chevron_right'}
                    fill={isIncome ? 'green' : 'red'}
                    rotate={isIncome ? '-90' : '90'}
                  />
                ),
              }, {
                key: 'date',
                title: 'Date',
              },
            ]}
          />
        )}
      </Composed>
    );
  }

}
