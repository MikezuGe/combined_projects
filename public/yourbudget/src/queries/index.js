import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


import { getFunds, createFunds, updateFunds, removeFunds, } from './funds';


export const GET_FUNDS = 'GET_FUNDS';
export const CREATE_FUND = 'CREATE_FUND';
export const UPDATE_FUND = 'UPDATE_FUND';
export const REMOVE_FUNDS = 'REMOVE_FUNDS';


const queries = {
  GET_FUNDS: getFunds,
  CREATE_FUND: createFunds,
  UPDATE_FUND: updateFunds,
  REMOVE_FUNDS: removeFunds,
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
    return !nextState.loading;
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
      this.props.onError && this.props.onError({
        status: result.status,
        statusText: result.statusText,
      });
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

  refetch = async () => {
    this.setState({ loading: true, });
    this.updateState(await this.tryFetch());
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

  async tryMutate (variables) {
    const query = queries[this.props.query];
    let result = null;
    try {
      result = await axios.post('/', JSON.stringify({ query, variables, }));
      result.error = false;
    } catch (err) {
      result = err.response;
      result.error = true;
      this.props.onError && this.props.onError({
        status: result.status,
        statusText: result.statusText,
      });
    }
    return result;
  }

  updateState ({ error, status, statusText, data: { data, }, }) {
    this.setState({
      loading: false,
      error,
      data: error ? [] : status === 200 ? data[Object.keys(data)[0]] : null,
      status: status,
      statusText: statusText,
    });
  }

  onSubmit = async variables => {
    this.setState({ loading: true, });
    const result = await this.tryMutate(variables);
    this.updateState(result);
    return !result.error;
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.loading;
  }

  render () {
    const { onSubmit, } = this;
    return this.props.children({ onSubmit, });
  }

}
