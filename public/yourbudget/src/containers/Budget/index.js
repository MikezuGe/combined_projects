import React from 'react';

import { Desktop, } from '../../components/pages';
import { DataTable, } from '../../components/molecules';
import { addToast, openModal, } from '../../components/organisms';
import { BudgetAdd, } from '../../forms';
import query, { GET_FUNDS, } from '../../queries';


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
  }

  render () {
    const { error, data, } = this.state;
    console.log(data);
    return (
      <Desktop
        secondaryMenuItems={[
          {
            text: 'Add',
            onClick: () => openModal(<BudgetAdd someProps={'test'} />),
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
                  title: 'Income/Expense',
                  dataKey: 'isIncome',
                  render: () => <img src={`/shared_assets/icons/chevron_right.svg`}/>,
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
