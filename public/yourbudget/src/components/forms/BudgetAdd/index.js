import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import { Form, } from '../../organisms';
import { fields, } from '../../molecules';

console.log(fields);

class BudgetAdd extends React.Component {

  render () {
    return (
      <Form>
        <fields.TextField name='name' type='text' />
        <div>
          <fields.TextField name='password' type='password' />
        </div>
      </Form>
    );
  }

}


BudgetAdd.propTypes = {
  
}


export default BudgetAdd;
