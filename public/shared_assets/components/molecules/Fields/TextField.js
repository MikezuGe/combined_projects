import React from 'react';

import GeneralField from './GeneralField';


const TextField = props => (
  <GeneralField
    {...props}
    type={'text'}
  />
);


export default TextField;
