import { useState, } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


const Mutation = ({ mutation, onSuccess, onError, children, }) => {
  const [
    {
      loading,
      error,
      status,
      statusText,
      //data,
    },
    setState,
  ] = useState({
    loading: true,
    error: false,
    status: null,
    statusText: '',
    data: [],
  });

  const tryMutate = async variables => {
    try {
      const { status, statusText, data: { data, }, } = await axios.post(`/`, JSON.stringify({ query: mutation, variables, }));
      return {
        loading: false,
        error: false,
        status,
        statusText,
        data: data ? data[Object.keys(data)[0]] : [],
      };
    } catch ({ response, status, statusText, }) {
      return {
        loading: false,
        error: true,
        status,
        statusText,
        data: [],
      };
    }
  }

  const doMutation = async variables => {
    const result = await tryMutate(variables);
    result.error
      ? onError && onError(`${result.status} ${result.statusText}`)
      : onSuccess && onSuccess();
    setState(result);
    return !result.error;
  }

  return (
    children({
      loading,
      error: !loading && error && (`${status} ${statusText}`),
      mutate: doMutation,
    })
  );

};

Mutation.propTypes = {
  mutation: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.func.isRequired,
};


export default Mutation;
