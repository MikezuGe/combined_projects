import React from 'react';
import axios from 'axios';
axios.defaults.baseURL = `${window.location.origin}/api/graphql`;

import { Desktop, } from '../../components/pages';
import { DataTable, } from '../../components/molecules';
import { addToast, openModal, } from '../../components/organisms';
import { BudgetAdd, } from '../../components/forms';


const getAllfunds = () => new Promise((resolve, reject) => {
  axios.get('/?query={funds{id,name,amount,date}}')
    .then(val => resolve(val.data.data.funds))
    .catch(err => reject(err));
});


const BUDGET_ADD = 'BUDGET_ADD';


class Budget extends React.Component {

  state = {
    funds: [],
  }

  async componentDidMount () {
    try {
      const funds = await getAllfunds();
      this.setState({ funds, });
    } catch (e) {
      addToast(e);
    }
    // Remove after testing!!! -----------------------------------
    openModal(BUDGET_ADD);
  }

  render () {
    const { funds, } = this.state;
    return (
      <Desktop
        secondaryMenuItems={[
          {
            text: 'Add',
            onClick: () => openModal(BUDGET_ADD),
          }
        ]}
        modalViews={{
          [BUDGET_ADD]: () => <BudgetAdd />,
        }}
      >
        { (!funds.length && <div>Loading!</div>) || (
          <DataTable
            headerFilter={'id'}
            data={funds}
          />
        )}
      </Desktop>
    );
  }
}


export default Budget;
