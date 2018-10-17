import React from 'react';
import styled from 'styled-components';

import { Desktop, } from '../../components/pages';
import { DataTable, } from '../../components/molecules';
import { addToast, openModal, } from '../../components/organisms';
import { BudgetAdd, } from '../../forms';
import query, { GET_FUNDS, } from '../../queries';


const IncomeExpenseImage = styled.img`
transform: rotate(${({ dataValue }) => dataValue ? -90 : 90}deg);
`;


class Budget extends React.Component {

  state = {
    error: false,
    data: [],
  }

  async componentDidMount () {
    const result = await query(GET_FUNDS);
    if (result.status === 200) {
      this.setState({
        error: false,
        data: result.data,
      });
    } else {
      this.setState({ error: true, });
      addToast(`${result.status}, ${result.statusText}`);
    }
    // ----- Remove after testing
    openModal(<BudgetAdd />)
  }

  render () {
    const { error, data, } = this.state;
    return (
      <Desktop
        secondaryMenuItems={[
          {
            text: 'Add',
            onClick: () => openModal(<BudgetAdd />),
          }
        ]}
      >
        { (error && <div>An error occurred while loading data...</div>)
          || (!data.length && <div>Loading...</div>)
          || (
            <DataTable
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
              data={data}
            />
          )
        }
      </Desktop>
    );
  }
}


export default Budget;
