import React from 'react';
import { adopt, } from 'react-adopt';

import { Query, Mutation, } from '../../../shared_assets/components/GraphQL';
import { Icon, } from '../../../shared_assets/components/atoms';
import { ToasterConsumer, ModalConsumer, } from '../../../shared_assets/components/contexts';

import { ListDesktop, } from '../pages';
import { GET_FUNDS, CREATE_FUNDS, UPDATE_FUNDS, REMOVE_FUNDS, } from '../queries';
import { BudgetEdit, } from '../forms';


const Composed = adopt({
  Toaster: <ToasterConsumer />,
  Modal: <ModalConsumer />,
  Query: ({ Toaster: { addToast, }, render, }) => (
    <Query
      query={GET_FUNDS}
      onError={err => addToast({
        type: 'error',
        title: 'Error',
        text: err,
      })}
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
  ),
  Create: ({ Toaster: { addToast, }, Query: { refetch, }, render, }) => (
    <Mutation
      mutation={CREATE_FUNDS}
      onSuccess={() => {
        addToast({
          type: 'success',
          title: 'Success',
          text: 'Fund was successfully created',
        });
        refetch();
      }}
      onError={err => addToast({
        type: 'error',
        title: 'Error',
        text: err,
      })}
    >
      {({
        loading: createLoading,
        error: createError,
        mutate: upsertData,
        data,
      }) => (
        render({
          createLoading,
          createError,
          upsertData,
          data,
        })
      )}
    </Mutation>
  )
});


export default class Budget extends React.Component {

  render () {
    return (
      <Composed>
        {({
          Modal: { openModal, },
          Query: { queryLoading, queryError, data, },
          Create: { createLoading, createError, upsertData, },
        }) => (
          <ListDesktop
            secondaryMenuItems={[
              {
                title: 'Create funds',
                onClick: () => openModal(({ closeModal, }) => (
                  <BudgetEdit
                    onSubmit={async input => await upsertData({ input, })}
                    onClose={closeModal}
                  />
                )),
              },
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
