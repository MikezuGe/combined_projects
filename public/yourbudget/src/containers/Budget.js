import React from 'react';
import { adopt, } from 'react-adopt';

import { Query, } from '../../../shared_assets/components/GraphQL';
import { Icon, } from '../../../shared_assets/components/atoms';
import { ToasterConsumer, ModalConsumer, } from '../../../shared_assets/components/contexts';

import { ListDesktop, } from '../pages';
import { GET_FUNDS, CREATE_FUNDS, UPDATE_FUNDS, REMOVE_FUNDS, } from '../queries';
import { BudgetEdit, } from '../forms';


const Composed = adopt({
  toaster: ({ render, }) => (
    <ToasterConsumer>
      {({ addToast, }) => render({ addToast, })}
    </ToasterConsumer>
  ),
  modal: ({ render, }) => (
    <ModalConsumer>
      {({ openModal, }) => render({ openModal, })}
    </ModalConsumer>
  ),
  query: ({ toaster: { addToast, }, render, }) => (
    <Query
      query={GET_FUNDS}
      onError={err => {
        addToast({
          type: 'error',
          title: 'Error',
          text: err,
        });
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
  ),
});


export default class Budget extends React.Component {

  render () {
    return (
      <Composed>
        {({
          query: { queryLoading, queryError, data, },
          modal: { openModal, },
        }) => (
          <ListDesktop
            secondaryMenuItems={[
              {
                title: 'Titteli',
              }, {
                title: 'Toinen',
                onClick: () => openModal(({ closeModal, }) => (
                  <BudgetEdit
                    onSubmit={variables => { console.log('submitted in budget', variables); return true; }}
                    onClose={closeModal}
                  />
                )),
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
