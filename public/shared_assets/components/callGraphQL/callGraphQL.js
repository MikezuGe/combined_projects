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


/**
 * 
 * @param {Object} props
 * @param {string} props.query - GraphQL query string. Use either query or mutation parameter
 * @param {string} props.mutation - GraphQL query string. Use either this or query parameter
 * @param {Function} props.onSuccess
 * @param {Function} props.onError
 * @returns {[state, doQuery]} - Array of that contains state and a function to do queries
 */
const callGraphQL = ({ query: initialQuery, mutation: initialMutation, onSuccess, onError, } = {}) => {
  const [ state, setState, ] = useState({
    loading: false,
    data: [],
    error: '',
    variables: undefined,
  });

  const doQuery = useMemo(() => {
    /**
     * 
     * @param {Object} props
     * @param {string} [props.query] - GraphQL query string. Use either query or mutation parameter
     * @param {string} [props.mutation] - GraphQL query string. Use either this or query parameter
     * @param {Object} [props.variables] - GraphQL variables to send with this or mutation
     * @returns {boolean} - True if query was successfull, or false
     */
    const q = async ({ query, mutation, variables, } = {}) => {
      setState(prevResult => ({ ...prevResult, loading: true, }))
      const result = {
        ...(await tryCall({ query: query || initialQuery || mutation || initialMutation, variables, })),
        variables,
      };
      result.error
        ? onError && onError(result)
        : onSuccess && onSuccess(result);
      setState(result);
      return result;
    }
    return q;
  }, []);

  return [ state, doQuery, ];
};


const setAuthorization = auth =>
  axios.defaults.headers['Authorization'] = auth;


export { setAuthorization, };
export default callGraphQL;
