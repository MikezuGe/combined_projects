import React, { useContext, } from 'react';

import { DefaultDesktop, } from '../pages';
import { Register, } from '../forms';
import { CREATE_USER, } from '../queries';

import callGraphQL from 'components/callGraphQL/callGraphQL';
import { ToasterContext, } from 'components/contexts';


const Home = () => {
  const { addToast, } = useContext(ToasterContext);

  const createUser = async variables => {
    const result = await callGraphQL({
      mutation: CREATE_USER,
      variables,
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
    return !result.error;
  };

  return (
    <DefaultDesktop>
      <Register
        onSubmit={async input => await createUser({ input, })}
        onClose={test => console.log('Closing', test)}
      />
    </DefaultDesktop>
  );
};


export default Home;
