import React from 'react';

import GeneralField from './GeneralField';


const DateField = props => (
  <GeneralField
    {...props}
    type={'date'}
  />
);


export default DateField;
