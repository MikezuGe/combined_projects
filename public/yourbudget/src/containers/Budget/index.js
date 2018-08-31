import React from 'react';
import axios from 'axios';
axios.defaults.baseURL = `${window.location.origin}/api/graphql`


const getAllfunds = () => new Promise((resolve, reject) => {
  axios.get('/?query={funds{_id,name,amount,date}}')
    .then(val => resolve(val.data.data))
    .catch(err => reject(err));
})


class Budget extends React.Component {

  state = {
    funds: [],
  }

  componentDidMount () {
    getAllfunds()
      .then(result => this.setState({ funds: result.funds, }))
      .catch(err => console.error(err));
  }

  renderFunds () {
    const { funds, } = this.state;
    if (funds.length) {
      return (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
            { funds.map(fund => (
              <tr key={fund._id}>
                <td>{fund.name}</td>
                <td>{fund.amount}</td>
                <td>{fund.date}</td>
              </tr>
            )) }
          </tbody>
        </table>
      );
    }

  }

  render () {
    return (
      <div>
        { this.renderFunds() }
      </div>
    );
  }
}


export default Budget;
