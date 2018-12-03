import React from 'react';
import PropTypes from 'prop-types';
import { adopt, } from 'react-adopt';

import { Query, Mutation, } from '../../../shared_assets/components/GraphQL';
import { Icon, } from '../../../shared_assets/components/atoms';
import { ToasterConsumer, ModalConsumer, } from '../../../shared_assets/components/contexts';
import { parseDate, } from '../../../shared_assets/components/utility';

import { ListDesktop, } from '../pages';
import { GET_FUNDS, CREATE_FUNDS, UPDATE_FUNDS, REMOVE_FUNDS, } from '../queries';
import { BudgetEdit, } from '../forms';


const propTypes = {};


propTypes.render = PropTypes.func.isRequired;
const Toaster = ({ render, }) => <ToasterConsumer>{render}</ToasterConsumer>
Toaster.propTypes = { ...propTypes, };


const Modal = ({ render, }) => <ModalConsumer>{render}</ModalConsumer>
Modal.propTypes = { ...propTypes, };


propTypes.Toaster = PropTypes.object.isRequired;
const QueryComponent = ({ Toaster: { addToast, }, render, }) => (
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
);
QueryComponent.propTypes = { ...propTypes, };


propTypes.Query = PropTypes.object.isRequired;
const Create = ({ Toaster: { addToast, }, Query: { refetch, }, render, }) => (
  <Mutation
    mutation={CREATE_FUNDS}
    onSuccess={() => {
      addToast({
        type: 'success',
        title: 'Success',
        text: 'Fund was created successfully',
      });
      refetch();
    }}
    onError={err => addToast({
      type: 'error',
      title: 'Error',
      text: err,
    })}
  >
    {({ mutate: createData, }) => (
      render({ createData, })
    )}
  </Mutation>
);
Create.propTypes = { ...propTypes, };


const Update = ({ Toaster: { addToast, }, Query: { refetch, }, render, }) => (
  <Mutation
    mutation={UPDATE_FUNDS}
    onSuccess={() => {
      addToast({
        type: 'success',
        title: 'Success',
        text: 'Fund was created successfully',
      });
      refetch();
    }}
    onError={err => addToast({
      type: 'error',
      title: 'Error',
      text: err,
    })}
  >
    {({ mutate: updateData, }) => (
      render({ updateData, })
    )}
  </Mutation>
);
Update.propTypes = { ...propTypes, };


const Remove = ({ Toaster: { addToast, }, Query: { refetch, }, render, }) => (
  <Mutation
    mutation={REMOVE_FUNDS}
    onSuccess={() => {
      addToast({
        type: 'success',
        title: 'Success',
        text: 'Fund was removed successfully',
      });
      refetch();
    }}
    onError={err => addToast({
      type: 'error',
      title: 'Error',
      text: err,
    })}
  >
    {({ mutate: removeData, }) => (
      render({ removeData, })
    )}
  </Mutation>
);
Remove.propTypes = { ...propTypes, };


const Composed = adopt({
  Toaster,
  Modal,
  Query: QueryComponent,
  Create,
  Update,
  Remove,
});


const Budget = () => (
  <Composed>
    {({
      Modal: { openModal, },
      Query: { queryLoading, queryError, data, },
      Create: { createData, },
      Update: { updateData, },
      Remove: { removeData, },
    }) => (
      <ListDesktop
        secondaryMenuItems={[
          {
            title: 'Create funds',
            onClick: () => openModal(({ closeModal, }) => (
              <BudgetEdit
                onSubmit={input => createData({ input, })}
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
                fill={isIncome
                  ? 'green'
                  : 'red'}
                rotate={isIncome
                  ? '-90'
                  : '90'}
              />
            ),
          }, {
            key: 'date',
            title: 'Date',
            render: date => parseDate(date, 'YYYY-MM-DD'),
          }, {
            title: 'Edit',
            onClick: data => openModal(({ closeModal, }) => (
              <BudgetEdit
                initialValues={data}
                onSubmit={input => updateData({ id: data.id, input, })}
                onClose={closeModal}
              />
            )),
            render: () => (
              <Icon
                icon={'pencil'}
                fill={'green'}
              />
            ),
          }, {
            title: 'Remove',
            onClick: ({ id, }) => removeData({ ids: [ id, ], }),
            render: () => (
              <Icon
                icon={'clear'}
                fill={'red'}
              />
            ),
          },
        ]}
      />
    )}
  </Composed>
);


export default Budget;
