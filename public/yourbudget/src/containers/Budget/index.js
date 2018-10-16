import React from 'react';

import { Desktop, } from '../../components/pages';
import { DataTable, } from '../../components/molecules';
import { addToast, openModal, } from '../../components/organisms';
import { BudgetAdd, } from '../../forms';
import query, { GET_FUNDS, } from '../../queries';


const BUDGET_ADD = 'BUDGET_ADD';


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
    // Remove after testing!!! -----------------------------------
    openModal(BUDGET_ADD);
  }

  render () {
    const { error, data, } = this.state;
    return (
      <Desktop
        secondaryMenuItems={[
          {
            text: 'Add',
            onClick: () => openModal(BUDGET_ADD),
          }
        ]}
        modalViews={{
          [BUDGET_ADD]: props => <BudgetAdd {...props} />,
        }}
      >
        { (error && <div>An error occurred while loading data...</div>)
          || (!data.length && <div>Loading...</div>)
          || (
            <DataTable
              headerFilter={'id'}
              data={data}
            />
          )
        }
      </Desktop>
    );
  }
}


export default Budget;
