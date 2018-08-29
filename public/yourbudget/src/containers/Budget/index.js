import React from 'react';
import axios from 'axios';
axios.defaults.baseURL = `${window.location.origin}/api/graphql`


const getAllfunds = () => new Promise((resolve, reject) => {
  axios.get('/?query={funds{id,name,amount,date}}')
    .then(val => resolve(val.data.data))
    .catch(err => reject(err));
})


class Budget extends React.Component {

  componentDidMount () {
    getAllfunds().then(result => console.log(result));
  }

  render () {
    return (
      <div>
        Budget
      </div>
    );
  }
}


export default Budget;
