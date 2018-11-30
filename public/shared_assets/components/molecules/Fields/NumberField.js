import React from 'react';

import GeneralField from './GeneralField';


const NumberField = props => (
  <GeneralField
    {...props}
    type={'number'}
  />
);


export default NumberField;
