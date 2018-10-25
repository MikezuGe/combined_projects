import React from 'react';
import styled from 'styled-components';

import { Desktop, } from '../../components/pages';
import { DataTable, } from '../../components/molecules';
import { addToast, openModal, } from '../../components/organisms';
import { Icon, } from '../../components/atoms';
import { BudgetAdd, } from '../../forms';
import { Query, GET_FUNDS, } from '../../queries';


const IncomeExpenseIcon = styled(Icon)`
`;


class Budget extends React.Component {

  render () {
    return (
      <React.Fragment>
        <Desktop
          secondaryMenuItems={[
            {
              text: 'Add',
              onClick: () => openModal(<BudgetAdd />),
            }
          ]}
        >
          <Query
            query={GET_FUNDS}
            onError={({ status, statusText, }) => addToast(`${status} ${statusText}`)}
          >
            {({ loading, error, data, }) => (
              (loading && <div>Loading...</div>)
              || (error && <div>An error occurred while loading data...</div>)
              || ((!data || !data.length) && <div>No data was found...</div>)
              || (
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
                      render: data => (
                        <IncomeExpenseIcon
                          rotate={data.isIncome ? 270 : 90}
                          icon={'chevron_right'}
                        />
                      ),
                    }, {
                      render: data => <div onClick={() => console.log('Should edit')}>{'Edit by clicking here'}</div>,
                    }, {
                      render: data => <div onClick={() => console.log('Should remove')}>{'Remove by clicking here'}</div>,
                    }
                  ]}
                />
              )
            )}
          </Query>
        </Desktop>
      </React.Fragment>
    );
  }
}


export default Budget;
