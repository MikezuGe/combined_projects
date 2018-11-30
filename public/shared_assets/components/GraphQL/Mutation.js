import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


export default class Mutation extends React.Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
  }

  state = {
    loading: true,
    error: false,
    status: null,
    statusText: '',
    data: [],
  }

  doMutation = async variables => {
    const result = await this.tryMutate(variables);
    this.setState({ ...result, });
    return !result.error;
  }

  async tryMutate (variables) {
    const { mutation, } = this.props;
    try {
      const { status, statusText, data: { data, }, } = await axios.post(`/`, JSON.stringify({ query: mutation, variables, }));
      this.props.onSuccess && this.props.onSuccess();
      return {
        loading: false,
        error: false,
        status,
        statusText,
        data: data ? data[Object.keys(data)[0]] : [],
      };
    } catch ({ response, response: { status, statusText, }, }) {
      this.props.onError && this.props.onError(`${status} ${statusText}`);
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
    const { loading, error, status, statusText, } = this.state;
    const { doMutation: mutate, } = this;
    return (
      children({
        loading,
        error: !loading && error && (`${status} ${statusText}`),
        mutate,
      })
    );
  }

}
