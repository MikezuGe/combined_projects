import axios from 'axios';
axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


import { default as createFund, } from './createFund';
import { default as getFunds, } from './getFunds';


export const CREATE_FUND = 'CREATE_FUND';
export const GET_FUNDS = 'GET_FUNDS';


const POST = 'POST';
const GET = 'GET';


const queries = {
  CREATE_FUND: {
    method: POST,
    query: createFund,
  },
  GET_FUNDS: {
    method: GET,
    query: getFunds.replace(/\s/gi, ''),
  }
};


const query = async (q, input) => {
  const variables = { input, };
  const { method, query, } = queries[q];
  let result = null;
  try {
    result = method === GET
      ? await axios.get(`/?${query}`)
      : await axios.post('/', JSON.stringify({ query, variables, }));
      // Delete method maybe?
  } catch (err) {
    result = err.response;
  }
  return {
    status: result.status,
    statusText: result.statusText,
    data: result.status === 200 ? result.data.data[Object.keys(result.data.data)[0]] : null,
  };
};


export default query;
