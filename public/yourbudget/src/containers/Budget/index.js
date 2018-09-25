import React from 'react';
import axios from 'axios';
import { Table, } from '../../components/molecules';


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
      <React.Fragment>
        { (!funds.length && <div>Loading!</div>) || (
          <Table
            headers={[
              'Name',
              'Amount',
              'Date',
            ]}
            data={funds}
          />
        )}
      </React.Fragment>
    );
  }
}


export default Budget;
