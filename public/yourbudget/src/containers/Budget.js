import React, { useContext, useState, useEffect, } from 'react';

import { Icon, } from 'components/atoms';
import { ModalContext, ToasterContext, } from 'components/contexts';
import callGraphQL from 'components/callGraphQL/callGraphQL';
import { parseDate, } from 'components/utility';

import { ListDesktop, } from '../pages';
import { GET_FUNDS, CREATE_FUND, UPDATE_FUND, REMOVE_FUND, } from '../queries';
import { BudgetEdit, } from '../forms';


const Budget = () => {
  const { addToast, } = useContext(ToasterContext);
  const { openModal, } = useContext(ModalContext);

  const [ data, setData, ] = useState([]);
  const [ loading, setLoading, ] = useState(true);
  const [ error, setError, ] = useState('');

  const query = (variables = {}) => {
    setLoading(true);
    callGraphQL({
      query: GET_FUNDS,
      variables,
      onSuccess: ({ data, errors, }) => {
        setLoading(false);
        setError('');
        setData(data);
        errors && addToast({
          type: 'error',
          title: 'Error',
          text: errors.join('. '),
        });
      },
      onError: ({ status, statusText, }) => {
        setLoading(false);
        setError(`${status}: ${statusText}`);
        addToast({
          type: 'error',
          title: 'Error',
          text: `${status}: ${statusText}`,
        });
      },
    });
  };

  const mutation = async (variables = {}) => {
    setLoading(true);
    const result = await callGraphQL({
      mutation: variables.input
        ? variables.filters ? UPDATE_FUND : CREATE_FUND
        : REMOVE_FUND,
      variables,
      onSuccess: ({ errors, }) => {
        setLoading(false);
        setError('');
        addToast({
          type: errors ? 'error' : 'success',
          title: errors ? 'Error' : 'Success',
          text: errors
            ? errors.join('. ')
            : `Fund was ${variables.input
              ? variables.filters ? 'updated' : 'created'
              : 'removed'} successfully`,
        });
        query();
      },
      onError: ({ status, statusText, }) => {
        setLoading(false);
        setError(`${status}: ${statusText}`);
        addToast({
          type: 'error',
          title: 'Error',
          text: `${status}: ${statusText}`,
        });
      },
    });
    return !result.error;
  };

  useEffect(() => (query(), undefined), []);

  return (
    <ListDesktop
      secondaryMenuItems={[
        {
          title: 'Create funds',
          onClick: () => openModal(({ closeModal, }) => (
            <BudgetEdit
              onSubmit={input => mutation({ input, })}
              onClose={closeModal}
            />
          )),
        },
      ]}
      loading={loading}
      error={error}
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
      onFiltersChange={filters => query({ filters, })}
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
              onSubmit={input => mutation({ filters: { id: data.id, }, input, })}
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
          onClick: ({ id, }) => mutation({ filters: { id, }, }),
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
