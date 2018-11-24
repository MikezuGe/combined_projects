import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


export default class Query extends React.Component {
  
  componentDidMount () {
    this.doQuery();
  }

  static propTypes = {
    children: PropTypes.func.isRequired,
    onError: PropTypes.func,
  }

  state = {
    loading: true,
    status: null,
    statusText: '',
    error: false,
    data: [],
  }

  async doQuery () {
    this.setState({
      ...(await this.tryFetch()),
    });
  }

  async tryFetch () {
    const { query, variables, } = this.props;
    try {
      const { status, statusText, data: { data, }, } = await axios.post(`/`, JSON.stringify({ query, variables, }));
      return {
        loading: false,
        error: false,
        status,
        statusText,
        data: data ? data[Object.keys(data)[0]] : [],
      };
    } catch ({ response: { status, statusText, }, }) {
      this.props.onError && this.props.onError({ status, statusText, });
      return {
        loading: false,
        error: true,
        status,
        statusText,
      };
    }
  }

  render () {
    const { children, } = this.props;
    const { loading, error, status, statusText, data, } = this.state;
    const { doQuery: refetch, } = this;
    return (
      children({
        loading,
        error: !loading && error && (`${status} ${statusText}`),
        refetch,
        data,
      })
    );
  }

}
