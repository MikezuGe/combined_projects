import React from 'react';
import PropTypes from 'prop-types';
import { adopt, } from 'react-adopt';

import { Query, } from '../../../shared_assets/components/GraphQL';
import { Desktop, } from '../../../shared_assets/components/pages';
import { DataTable, } from '../../../shared_assets/components/organisms';
import { Icon, } from '../../../shared_assets/components/atoms';

import { GET_FUNDS, CREATE_FUNDS, UPDATE_FUNDS, REMOVE_FUNDS, } from '../queries';

const Q = ({ render, }) => (
  <Query
    query={GET_FUNDS}
    onError={err => {
      // TOAST HERE
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
          <Desktop
            menuItems={[
              {
                title: 'Titteli',
              }, {
                title: 'Toinen',
              }, {
                title: 'Hehheh',
                render: () => <div>{'Rendered'}</div>
              }
            ]}
          >
            {
              (queryLoading && <div>{'Loading'}</div>)
              || (queryError && <div>{`Error: ${error}`}</div>)
              || (!data && <div>{'No data found!'}</div>)
              || (
                <DataTable
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
                  data={data}
                />
              )
            }
          </Desktop>
        )}
      </Composed>
    );
  }

}
