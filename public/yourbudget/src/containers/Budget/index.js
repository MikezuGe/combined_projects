import React from 'react';
import styled from 'styled-components';

import { Desktop, } from '../../components/pages';
import { DataTable, } from '../../components/molecules';
import { addToast, openModal, } from '../../components/organisms';
import { BudgetAdd, } from '../../forms';
import { Query, GET_FUNDS, } from '../../queries';


const IncomeExpenseImage = styled.img`
transform: rotate(${({ dataValue }) => dataValue ? -90 : 90}deg);
`;


class Budget extends React.Component {

  render () {
    return (
      <Query
        query={GET_FUNDS}
        onError={({ status, statusText, }) => addToast(`${status} ${statusText}`)}
      >
        {
          ({ loading, error, data, }) => (
            <React.Fragment>
              <Desktop
                secondaryMenuItems={[
                  {
                    text: 'Add',
                    onClick: () => openModal(<BudgetAdd />),
                  }
                ]}
              >
                {
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
                        }, {
                          title: '',
                          dataKey: 'isIncome',
                          render: props => <IncomeExpenseImage {...props} src={`/shared_assets/icons/chevron_right.svg`}/>,
                        }
                      ]}
                    />
                  )
                }
              </Desktop>
            </React.Fragment>
          )
        }
      </Query>
    );
  }
}


export default Budget;
