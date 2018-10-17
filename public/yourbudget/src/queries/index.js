import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


import { default as createFund, } from './createFund';
import { default as getFunds, } from './getFunds';


export const CREATE_FUND = 'CREATE_FUND';
export const GET_FUNDS = 'GET_FUNDS';


const POST = 'POST';
const GET = 'GET';


const queries = {
  CREATE_FUND: {
    method: POST,
    query: createFund,
  },
  GET_FUNDS: {
    method: GET,
    query: getFunds.replace(/\s/gi, ''),
  }
};


class Query extends React.Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
    ]).isRequired,
    query: PropTypes.string.isRequired,
    input: PropTypes.object,
    onError: PropTypes.func,
  }

  state = {
    loading: true,
    error: false,
    data: [],
    status: null,
    statusText: '',
  }

  async componentDidMount () {
    const variables = { input: this.props.input, };
    const { method, query, } = queries[this.props.query];
    let result = null;
    let error = false;
    try {
      result = method === GET
        ? await axios.get(`/?${query}`)
        : await axios.post('/', JSON.stringify({ query, variables, }));
        // Delete method maybe?
    } catch (err) {
      error = true;
      result = err.response;
      this.props.onError({ status: result.status, statusText: result.statusText, });
    }
    this.setState({
      loading: false,
      error: error,
      data: error ? [] : result.status === 200 ? result.data.data[Object.keys(result.data.data)[0]] : null,
      status: result.status,
      statusText: result.statusText,
    });
  }
  
  shouldComponentUpdate (nextProps, nextState) {
    return this.state.loading !== nextState.loading;
  }
  
  render () {
    const { loading, error, data, status, statusText, } = this.state;
    return this.props.children({ loading, error, data, status, statusText, });
  }

}


export default Query;
