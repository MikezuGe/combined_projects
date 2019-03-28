import { useState, useMemo, } from 'react';
import axios from 'axios';


axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers['Content-Type'] = 'application/json';


const tryCall = async ({ query, variables, }) => {
  try {
    const { status, statusText, data: { data, errors, }, } = 
      await axios.post(`/`, JSON.stringify({ query, variables, }));
    const error = status !== 200 ? `${status}: ${statusText}` : '';
    return {
      loading: false,
      data: data ? data[Object.keys(data)[0]] : [],
      error: errors ? `${error}, ${errors.join('. ')}` : error,
    };
  } catch ({ response, request, }) {
    const { status, statusText, data: { data, errors, }, } = (response || request);
    const error = status !== 200 ? `${status}: ${statusText}` : '';
    return {
      loading: false,
      data: data ? data[Object.keys(data)[0]] : [],
      error: errors ? `${error}, ${errors.join('. ')}` : error,
    };
  }
};


const callGraphQL = ({ onSuccess, onError, } = {}) => {
  const [ state, setState, ] = useState({
    loading: false,
    data: [],
    error: '',
    variables: undefined,
  });

  const q = useMemo(() => async ({ query, mutation, variables, }) => {
    setState(prevResult => ({ ...prevResult, loading: true, }))
    const result = {
      ...(await tryCall({ query: query || mutation, variables, })),
      variables,
    };
    result.error
      ? onError && onError(result)
      : onSuccess && onSuccess(result);
    setState(result);
    return !result.error;
  }, []);

  return [ state, q, ];
};


const setAuthorization = auth =>
  axios.defaults.headers['Authorization'] = auth;


export { setAuthorization, };
export default callGraphQL;
