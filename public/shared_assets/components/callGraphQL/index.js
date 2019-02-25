import axios from 'axios';


axios.defaults.baseURL = `${window.location.origin}/api/graphql`;
axios.defaults.headers = { 'Content-Type': 'application/json', };


const tryCall = async (query, variables) => {
  try {
    const { status, statusText, data: { data, }, } = await axios.post(`/`, JSON.stringify({ query, variables, }));
    return {
      error: false,
      status,
      statusText,
      data: data ? data[Object.keys(data)[0]] : [],
    };
  } catch ({ response: { status, statusText, }, }) {
    return {
      error: true,
      status,
      statusText,
      data: [],
    };
  }
};


const callGraphQL = async ({ query, mutation, variables, onSuccess, onError, }) => {
  const result = await tryCall(query || mutation, variables);
  result.error
    ? onError && onError(result)
    : onSuccess && onSuccess(result);
  return !result.error;
};


export default callGraphQL;
