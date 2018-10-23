import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


import { default as createFunds, } from './createFunds';
import { default as getFunds, } from './getFunds';


export const CREATE_FUND = 'CREATE_FUND';
export const GET_FUNDS = 'GET_FUNDS';


const queries = {
  GET_FUNDS: getFunds,
  CREATE_FUND: createFunds,
};


export class Query extends React.Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
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
    const { variables, } = this.props;
    const query = queries[this.props.query];
    let result = null;
    let error = false;
    try {
      result = await axios.post(`/`, JSON.stringify({ query, variables, }));
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
    const { loading, error, data, } = this.state;
    return this.props.children({ loading, error, data, });
  }

}


export class Mutation extends React.Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.array,
    ]).isRequired,
    query: PropTypes.string.isRequired,
    onError: PropTypes.func,
  }

  state = {
    loading: true,
    error: false,
    data: [],
    status: null,
    statusText: '',
  }

  onSubmit = async variables => {
    console.log(variables);
    const query = queries[this.props.query];
    let result = null;
    let error = false;
    try {
      result = await axios.post('/', JSON.stringify({ query, variables, }));
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
    return !error;
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state.loading !== nextState.loading;
  }

  render () {
    const { onSubmit, } = this;
    return this.props.children({ onSubmit, });
  }

}