import React from 'react';

import { Form, } from '../../../../shared_assets/components/organisms';


const validateName = value => {
  if (!value) {
    return 'Required';
  }
};

const validateAmount = value => {
  if (!value) {
    return 'Required';
  }
};

const validateDate = value => {
  if (!value) {
    return 'Required';
  }
};


const BudgetEdit = props => (
  <Form
    {...props}
    fields={[
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'e.g. Prisma, Kokkola',
        validate: validateName,
      }, {
        name: 'amount',
        type: 'number',
        label: 'Amount',
        placeholder: '~xxx.xx',
        validate: validateAmount,
      }, {
        name: 'date',
        type: 'date',
        label: 'Date',
        initialValue: new Date(),
        validate: validateDate,
      }, {
        name: 'isIncome',
        type: 'toggle',
        labelOn: 'Income',
        labelOff: 'Expense',
      }, {
        name: 'submit',
        type: 'submit',
        text: 'Submit',
        actions: 'submit',
      }, {
        name: 'submit&reset',
        type: 'submit',
        text: 'Submit & add',
        actions: [ 'submit', 'reset', ],
      }, {
        name: 'submit&close',
        type: 'submit',
        text: 'Submit & close',
        actions: [ 'submit', 'close', ],
      }, {
        name: 'close',
        type: 'submit',
        text: 'Close',
        actions: 'close',
      },
    ]}
  >
    {({ renderField, }) => (
      <React.Fragment>
        {renderField('name')}
        {renderField('amount')}
        {renderField('date')}
        {renderField('isIncome')}
        {renderField('submit')}
        {renderField('submit&reset')}
        {renderField('submit&close')}
        {renderField('close')}
      </React.Fragment>
    )}
  </Form>
);


export default BudgetEdit;
