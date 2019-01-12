import { useState, } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


const Mutation = ({ children, onError, onSuccess, mutation, }) => {
  const [
    { loading, error, status, statusText, },
    setMutationStatus,
  ] = useState({
    loading: true,
    error: false,
    status: null,
    statusText: '',
  });
  const [ , setData, ] = useState([]);

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
    const { data, ...mutationStatus } = await tryMutate(variables);
    mutationStatus.error
      ? onError && onError(`${status} ${statusText}`)
      : onSuccess && onSuccess();
    setMutationStatus(mutationStatus);
    setData(data);
    return !mutationStatus.error;
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
  children: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};


export default Mutation;
