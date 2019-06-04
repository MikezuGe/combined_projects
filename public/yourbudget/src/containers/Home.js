import React, { useContext, useMemo, } from 'react';

import { DefaultDesktop, } from '../pages';
import { Register, } from '../forms';
import { CREATE_USER, } from '../queries';

import callGraphQL from 'components/callGraphQL/callGraphQL';
import { ToasterContext, } from 'components/contexts';


const Home = () => {
  const { addToast, } = useContext(ToasterContext);

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

  const createUser = useMemo(() => async variables => {
    const result = await register({ variables, });
    return !result.error;
  }, []);

  return (
    <DefaultDesktop>
      <Register
        onSubmit={useCallback(() => async input => await createUser({ input, }), [])}
        onClose={test => { test }}
      />
    </DefaultDesktop>
  );
};


export default Home;
