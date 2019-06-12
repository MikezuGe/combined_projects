import React, { useContext, useMemo, useState, } from 'react';

import { Button, } from '@components/atoms';
import { AuthContext, ToasterContext, } from '@components/contexts';
import { callGraphQL, } from '@components/utility';

import { Login as LoginForm, Register as RegisterForm, } from '../forms';
import { LOGIN, CREATE_USER, } from '../queries';



const Frontpage = () => {
  const { addToast, } = useContext(ToasterContext);
  const { setAuth, } = useContext(AuthContext);
  const [ usingLogin, setUsingLogin, ] = useState(true);
  
  const [ , register, ] = callGraphQL({
    mutation: CREATE_USER,
    onSuccess: ({ data: { username, }, errors, }) => {
      addToast({
        type: errors ? 'error' : 'success',
        title: errors ? 'Error' : 'Success',
        text: errors
          ? `${errors.join('. ')}.`
          : `User ${username} created successfully`,
      });
    },
    onError: ({ status, statusText, }) => {
      addToast({
        type: 'error',
        title: 'Error',
        text: `${status}: ${statusText}`,
      });
    },
  });

  const [ , login, ] = callGraphQL({
    mutation: LOGIN,
    onSuccess: ({ errors, }) => {
      addToast({
        type: errors ? 'error' : 'success',
        title: errors ? 'Error' : 'Success',
        text: errors
          ? `${errors.join('. ')}.`
          : `Logged in successfully`,
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

  const createUser = useMemo(() => async variables => {
    const result = await register({ variables, });
    return !result.error;
  }, []);

  const loginUser = useMemo(() => async variables => {
    const result = await login({ variables, });
    setAuth(result.data.token);
    return !result.error;
  }, []);

  return (
    <>
      <Button
        label={usingLogin ? 'Register' : 'Login'}
        onClick={() => setUsingLogin(previousUsingLogin => !previousUsingLogin)}
      />
      {usingLogin && (
        <LoginForm
          onSubmit={async input => await loginUser({ input, })}
          onClose={test => { test }}
        />
      )}
      {!usingLogin && (
        <RegisterForm
          onSubmit={async input => await createUser({ input, })}
          onClose={test => { test }}
        />
      )}
    </>
  );
};


export default Frontpage;
