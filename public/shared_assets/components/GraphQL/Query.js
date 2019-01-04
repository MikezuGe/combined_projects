import { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


const Query = ({ query, variables, onError, children, }) => {
  const [
    {
      loading,
      error,
      status,
      statusText,
    },
    setQueryStatus,
  ] = useState({
    loading: true,
    error: false,
    status: null,
    statusText: '',
  });

  const [ data, setData, ] = useState([]);

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
      onError && onError(`${status} ${statusText}`);
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
    const { data, ...queryStatus } = await tryFetch();
    setQueryStatus(queryStatus);
    setData(data);
  };

  useEffect(() => {
    doQuery();
  }, [ variables, ]);

  return (
    children({
      loading,
      error: !loading && error ? (`${status} ${statusText}`) : '',
      refetch: doQuery,
      data,
    })
  );
};

Query.propTypes = {
  children: PropTypes.func.isRequired,
  onError: PropTypes.func,
};


export default Query;
