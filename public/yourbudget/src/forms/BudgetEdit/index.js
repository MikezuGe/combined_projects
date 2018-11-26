import React from 'react';
import PropTypes from 'prop-types';

import { Form, } from '../../../../shared_assets/components/organisms';


const validateName = value => {
  if (!value) {
    return 'Required';
  }
}


const BudgetEdit = ({ initialValues, onSubmit, }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    fields={[
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'e.g. Prisma, Kokkola',
        validate: validateName,
      }, {
        name: 'submit',
        type: 'submit',
        text: 'Submit',
        actions: [
          'submit',
          'close',
        ],
      }
    ]
  }>
    {({ renderField, submit, submitting, pristine, valid, }) => (
      <React.Fragment>
        <div>
          {renderField('name')}
        </div>
        <div>
          <button
            onClick={submit}
            disabled={submitting || pristine || !valid}
          >
            {'submit'}
          </button>
        </div>
      </React.Fragment>
    )}
  </Form>
);


BudgetEdit.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
}


export default BudgetEdit;
