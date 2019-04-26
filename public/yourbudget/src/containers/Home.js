import React, { useContext, } from 'react';

import callGraphQL from 'components/callGraphQL/callGraphQL';
import { AuthContext, ToasterContext, } from 'components/contexts';

import { DefaultDesktop, } from '../pages';
import { Register, Login, } from '../forms';
import { CREATE_USER, LOGIN, } from '../queries';


const Home = () => {
  const { setAuth, } = useContext(AuthContext);
  const { addToast, } = useContext(ToasterContext);

  const [ , register, ] = callGraphQL({
    mutation: CREATE_USER,
    onSuccess: ({ data: { username, }, error, }) => {
      addToast({
        type: error ? 'error' : 'success',
        title: error ? 'Error' : 'Success',
        text: error || `User ${username} created successfully`,
      });
    },
    onError: ({ error, }) => {
      addToast({
        type: 'error',
        title: 'Error',
        text: error,
      });
    },
  });

  const [ , doLogin, ] = callGraphQL({
    query: LOGIN,
    onSuccess: ({ data, error, }) => {
      console.log('d', data, error);
      setAuth(data.token)
    },
    onError: ({ error, }) => {
      console.log('e', error);
    },
  });

  const login = async variables => {
    const result = await doLogin({ variables, })
    return !result.error;
  }

  const createUser = async variables => {
    const result = await register({ variables, });
    return !result.error;
  };

  return (
    <DefaultDesktop>
      <Login
        onSubmit={async input => (console.log(input), await login({ input, }))}
      />
      <Register
        onSubmit={async input => await createUser({ input, })}
        onClose={() => {}}
      />
    </DefaultDesktop>
  );
};


export default Home;
