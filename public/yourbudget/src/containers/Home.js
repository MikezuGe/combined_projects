import React from 'react';

import { DefaultDesktop, } from '../pages';

import { Register, } from '../forms';


const Home = () => {

  return (
    <DefaultDesktop>
      <Register
        onSubmit={input => (console.log(input), false)}
        onClose={test => console.log('Closing', test)}
      />
    </DefaultDesktop>
  );
};


export default Home;
