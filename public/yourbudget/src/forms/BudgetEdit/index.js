import React from 'react';
import PropTypes from 'prop-types';

import { Form, } from '../../../../shared_assets/components/organisms';
import { parseDate, } from '../../../../shared_assets/components/utility';


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


const BudgetEdit = ({ initialValues, onSubmit, onClose, }) => (
  <Form
    initialValues={initialValues}
    onSubmit={onSubmit}
    onClose={onClose}
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
        initialValue: parseDate(new Date(), 'YYYY-MM-DD'),
        validate: validateDate,
      },
      {
        name: 'isIncome',
        type: 'toggle',
        labelOff: 'Expense',
        labelOn: 'Income',
      },
    ]}
    buttons={[
      {
        name: 'submit',
        text: 'Submit',
        actions: 'submit',
      }, {
        name: 'submit&reset',
        text: 'Submit & add',
        actions: [ 'submit', 'reset', ],
      }, {
        name: 'submit&close',
        text: 'Submit & close',
        actions: [ 'submit', 'close', ],
      }, {
        name: 'close',
        text: 'Close',
        actions: [ 'close', ],
      },
    ]}
  >
    {({ renderField, renderButton, }) => (
      <React.Fragment>
        {renderField('name')}
        {renderField('amount')}
        {renderField('date')}
        {renderField('isIncome')}
        {renderButton('submit')}
        {renderButton('submit&reset')}
        {renderButton('submit&close')}
        {renderButton('close')}
      </React.Fragment>
    )}
  </Form>
);


BudgetEdit.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}


export default BudgetEdit;
