import React from 'react';

import { Icon, } from '../../components/atoms';
import { DataTable, } from '../../components/molecules';
import { ToasterContextConsumer, ModalContextConsumer, } from '../../components/contexts';
import { Desktop, } from '../../components/pages';
import { BudgetAdd, } from '../../forms';
import { Query, Mutation, GET_FUNDS, REMOVE_FUNDS, } from '../../queries';


class Budget extends React.Component {

  render () {
    return (
      <ToasterContextConsumer>
        {({ addToast, }) => (
          <ModalContextConsumer>
            {({ openModal, }) => (
              <Query
                query={GET_FUNDS}
                onError={({ status, statusText, }) => addToast(`${status} ${statusText}`)}
              >
                {({ loading, error, data, refetch, }) => (
                  <Desktop
                    secondaryMenuItems={[
                      {
                        text: 'Add',
                        onClick: () => openModal(<BudgetAdd />),
                      }
                    ]}
                  >
                    {(loading && !data && <div>{'Loading...'}</div>)
                    || (error && <div>{'An error occurred while loading data...'}</div>)
                    || ((!data || !data.length) && <div>{'No data was found...'}</div>)
                    || (
                      <Mutation
                        query={REMOVE_FUNDS}
                        onError={({ status, statusText, }) => addToast(`${status} ${statusText}`)}
                      >
                        {({ onSubmit, }) => (
                          <DataTable
                            data={data}
                            rows={[
                              {
                                title: 'Name',
                                dataKey: 'name',
                              }, {
                                title: 'Amount',
                                dataKey: 'amount',
                              }, {
                                title: 'Date',
                                dataKey: 'date',
                                parseValue: value => value.slice(0, value.indexOf('T')),
                              }, {
                                dataKey: 'isIncome',
                                render: ({ isIncome, }) => (
                                  <Icon
                                    icon={'chevron_right'}
                                    fill={isIncome ? 'green' : 'red'}
                                    rotate={isIncome ? 270 : 90}
                                  />
                                ),
                              }, {
                                title: 'Edit',
                                onClick: rowData => openModal(<BudgetAdd data={rowData} />),
                                render: () => (
                                  <Icon icon={'pencil'} />
                                ),
                              }, {
                                title: 'Remove',
                                onClick: async ({ id, }) => {
                                  (await onSubmit({ ids: [ id, ], })) && refetch();
                                },
                                render: () => (
                                  <Icon
                                    icon={'clear'}
                                    fill={'red'}
                                  />
                                ),
                              }
                            ]}
                          />
                        )}
                      </Mutation>
                    )}
                  </Desktop>
                )}
              </Query>
            )}
          </ModalContextConsumer>
        )}
      </ToasterContextConsumer>
    );
  }
}


export default Budget;
