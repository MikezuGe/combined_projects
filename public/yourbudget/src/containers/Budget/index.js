import React from 'react';
import axios from 'axios';

import { Desktop, } from '../../components/pages';
import { DataTable, } from '../../components/molecules';


axios.defaults.baseURL = `${window.location.origin}/api/graphql`;


const getAllfunds = () => new Promise((resolve, reject) => {
  axios.get('/?query={funds{_id,name,amount,date}}')
    .then(val => resolve(val.data.data.funds))
    .catch(err => reject(err));
})


class Budget extends React.Component {

  state = {
    funds: [],
  }

  async componentDidMount () {
    const funds = await getAllfunds();
    this.setState({ funds, });
  }

  render () {
    const { funds, } = this.state;
    return (
      <Desktop
        secondaryMenuItems={[
          {
            text: 'test',
            onClick: () => console.log('asd'),
          }
        ]}>
        { (!funds.length && <div>Loading!</div>) || (
          <DataTable
            headerFilter={'_id'}
            data={funds}
          />
        )}
      </Desktop>
    );
  }
}


export default Budget;
