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
    this.updateState(await this.tryFetch());
  }
  
  shouldComponentUpdate (nextProps, nextState) {
    return this.state.loading !== nextState.loading;
  }

  async tryFetch () {
    const { variables, } = this.props;
    const query = queries[this.props.query];
    let result = null;
    try {
      result = await axios.post(`/`, JSON.stringify({ query, variables, }));
      result.error = false;
    } catch (err) {
      result = err.response;
      result.error = true;
      this.props.onError({ status: result.status, statusText: result.statusText, });
    }
    return result;
  }

  updateState ({ error, status, statusText, data: { data, }, }) {
    this.setState({
      loading: false,
      error,
      data: error ? [] : status === 200 ? data[Object.keys(data)[0]] : null,
      status,
      statusText,
    });
  }

  refetch = () => {
    this.setState({ loading: true, });
    this.updateState(this.tryFetch());
  }
  
  render () {
    const { refetch, state: { loading, error, data, }, } = this;
    return this.props.children({ loading, error, data, refetch, });
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
    const query = queries[this.props.query];
    let result = null;
    try {
      result = await axios.post('/', JSON.stringify({ query, variables, }));
      result.error = false;
    } catch (err) {
      result = err.response;
      result.error = true;
      this.props.onError({ status: result.status, statusText: result.statusText, });
    }
    const { error, status, statusText, data: { data, }, } = result;
    this.setState({
      loading: false,
      error,
      data: error ? [] : status === 200 ? data[Object.keys(data)[0]] : null,
      status: status,
      statusText: statusText,
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