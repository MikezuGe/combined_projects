import { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


const Query = ({ query, variables: queryVariables, onError, children, }) => {
  const [
    {
      loading,
      error,
      status,
      statusText,
      data,
    },
    setState,
  ] = useState({
    loading: true,
    error: false,
    status: null,
    statusText: '',
    data: [],
  });
  const [ variables, setVariables, ] = useState(queryVariables);

  const tryFetch = async () => {
    try {
      const { status, statusText, data: { data, }, } = await axios.post('/', JSON.stringify({ query, variables, }));
      return {
        loading: false,
        error: false,
        status,
        statusText,
        data: data ? data[Object.keys(data)[0]] : [],
      };
    } catch ({ response: { status, statusText, }, }) {
      return {
        loading: false,
        error: true,
        status,
        statusText,
        data: [],
      };
    }
  };

  const doQuery = async () => {
    const result = await tryFetch();
    result.error && onError && onError(`${result.status} ${result.statusText}`);
    setState(result);
  };

  useEffect(() => {
    doQuery();
  }, [ variables, ]);


  return (
    children({
      loading,
      error: !loading && error ? (`${status} ${statusText}`) : '',
      refetch: doQuery,
      setVariables,
      data,
    })
  );
};

Query.propTypes = {
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
  onError: PropTypes.func,
  children: PropTypes.func.isRequired,
};


export default Query;
