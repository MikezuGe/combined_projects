import React, { useContext, useEffect, } from 'react';

import { Icon, } from '@components/atoms';
import { ModalContext, ToasterContext, } from '@components/contexts';
import { callGraphQL, parseDate, } from '@components/utility';

import { ListDesktop, } from '../pages';
import { GET_FUNDS, CREATE_FUND, UPDATE_FUND, REMOVE_FUND, } from '../queries';
import { BudgetEdit, } from '../forms';


const Budget = () => {
  const { addToast, } = useContext(ToasterContext);
  const { openModal, } = useContext(ModalContext);

  const [ {
    data,
    loading: queryLoading,
    error: queryError,
  }, query, ] = callGraphQL({
    query: GET_FUNDS,
    onError: ({ error, }) => addToast({
      type: 'error',
      title: 'Error',
      text: error,
    }),
  });
  const [ {
    loading: mutationLoading,
    error: mutationError,
  }, mutate, ] = callGraphQL({
    onSuccess: ({ variables, error, }) => {
      addToast(error
        ? {
          type: 'error',
          title: 'Error',
          text: error,
        }
        : {
          type: 'success',
          title: 'Success',
          text: `Fund was ${variables.input
            ? variables.filters ? 'updated' : 'created'
            : 'removed'} successfully`,
        }
      );
      query();
    },
    onError: ({ error, }) => addToast({
      type: 'error',
      title: 'Error',
      text: error,
    }),
  });

  useEffect(() => (query(), undefined), []);

  return (
    <ListDesktop
      secondaryMenuItems={[
        {
          title: 'Create funds',
          onClick: () => openModal(({ closeModal, }) => (
            <BudgetEdit
              onSubmit={input => mutate({ mutation: CREATE_FUND, variables: { input, }, })}
              onClose={closeModal}
            />
          )),
        },
      ]}
      loading={queryLoading || mutationLoading}
      error={queryError || mutationError}
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
      onFiltersChange={filters => query({ variables: { filters, }, })}
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
              rotate={isIncome ? -90 : 90}
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
              onSubmit={input => mutate({ mutation: UPDATE_FUND, variables: { filters: { id: data.id, }, input, }, })}
              onClose={closeModal}
            />
          )),
          render: () => (
            <Icon
              icon={'edit'}
              fill={'green'}
            />
          ),
        }, {
          title: 'Remove',
          onClick: ({ id, }) => mutate({ mutation: REMOVE_FUND, variables: { filters: { id, }, }, }),
          render: () => (
            <Icon
              icon={'clear'}
              fill={'red'}
            />
          ),
        },
      ]}
    />
  );
};


export default Budget;
