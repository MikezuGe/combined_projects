import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { adopt, } from 'react-adopt';

import { Query, Mutation, } from '../../../shared_assets/components/GraphQL';
import { Icon, } from '../../../shared_assets/components/atoms';
import { ToasterConsumer, ModalConsumer, } from '../../../shared_assets/components/contexts';
import { parseDate, } from '../../../shared_assets/components/utility';

import { ListDesktop, } from '../pages';
import { GET_FUNDS, CREATE_FUND, UPDATE_FUND, REMOVE_FUND, } from '../queries';
import { BudgetEdit, } from '../forms';


const propTypes = {};


propTypes.render = PropTypes.func.isRequired;
const Toaster = ({ render, }) => <ToasterConsumer>{render}</ToasterConsumer>
Toaster.propTypes = { ...propTypes, };


const Modal = ({ render, }) => <ModalConsumer>{render}</ModalConsumer>
Modal.propTypes = { ...propTypes, };


propTypes.Toaster = PropTypes.object.isRequired;
const QueryComponent = ({ Toaster: { addToast, }, render, }) => {
  const [ queryVariables, setQueryVariables, ] = useState({ filters: null, });
  return (
    <Query
      query={GET_FUNDS}
      variables={queryVariables}
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
          setQueryVariables,
          queryLoading,
          queryError,
          refetch,
          data,
        })
      )}
    </Query>
  );
};
QueryComponent.propTypes = { ...propTypes, };


propTypes.Query = PropTypes.object.isRequired;
const Create = ({ Toaster: { addToast, }, Query: { refetch, }, render, }) => (
  <Mutation
    mutation={CREATE_FUND}
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
    {({ mutate: createFund, }) => (
      render({ createFund, })
    )}
  </Mutation>
);
Create.propTypes = { ...propTypes, };


const Update = ({ Toaster: { addToast, }, Query: { refetch, }, render, }) => (
  <Mutation
    mutation={UPDATE_FUND}
    onSuccess={() => {
      addToast({
        type: 'success',
        title: 'Success',
        text: 'Fund was updated successfully',
      });
      refetch();
    }}
    onError={err => addToast({
      type: 'error',
      title: 'Error',
      text: err,
    })}
  >
    {({ mutate: updateFund, }) => (
      render({ updateFund, })
    )}
  </Mutation>
);
Update.propTypes = { ...propTypes, };


const Remove = ({ Toaster: { addToast, }, Query: { refetch, }, render, }) => (
  <Mutation
    mutation={REMOVE_FUND}
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
    {({ mutate: removeFund, }) => (
      render({ removeFund, })
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
      Query: { queryLoading, queryError, setQueryVariables, data, },
      Create: { createFund, },
      Update: { updateFund, },
      Remove: { removeFund, },
    }) => (
      <ListDesktop
        secondaryMenuItems={[
          {
            title: 'Create funds',
            onClick: () => openModal(({ closeModal, }) => (
              <BudgetEdit
                onSubmit={input => createFund({ input, })}
                onClose={closeModal}
              />
            )),
          },
        ]}
        loading={queryLoading}
        error={queryError}
        data={data}
        filters={[
          {
            key: 'name',
            name: 'Name',
            type: 'text',
          }, {
            key: 'minAmount',
            name: 'Minimum amount',
            type: 'number',
          }, {
            key: 'maxAmount',
            name: 'Maximum amount',
            type: 'number',
          }, {
            key: 'startDate',
            name: 'From date',
            type: 'date',
          }, {
            key: 'endDate',
            name: 'To date',
            type: 'date',
          },
        ]}
        onFiltersChange={filters => setQueryVariables({ filters, })}
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
            render: date => parseDate(date, 'DD-MM-YYYY'),
          }, {
            title: 'Edit',
            onClick: data => openModal(({ closeModal, }) => (
              <BudgetEdit
                initialValues={data}
                onSubmit={input => updateFund({ filters: { id: data.id, }, input, })}
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
            onClick: ({ id, }) => removeFund({ filters: { id, }, }),
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
