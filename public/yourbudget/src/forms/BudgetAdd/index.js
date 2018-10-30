import React from 'react';
import PropTypes from 'prop-types';

import { Form, addToast, } from '../../components/organisms';
import { Field, } from '../../components/molecules';
import { Mutation, CREATE_FUND, UPDATE_FUND, } from '../../queries';


const validateName = t => {
  if (!t) {
    return 'Name not defined';
  } else if (t.length < 1) {
    return 'Name too short';
  } else if (!/^[a-z0-9-_,. ]+$/gi.test(t)) {
    return 'Allowed characters a-z0-9_-,.';
  }
};

const validateAmount = t => {
  if (!t) {
    return 'Amount not defined';
  } else if (isNaN(t)) {
    return 'Must be a number';
  } else if (!/^[0-9]*\.[0-9]{0,2}$/gi.test(t)) {
    return 'Must be defined as xxx,xx';
  }
};

const defaultDate = () => new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString();


class BudgetAdd extends React.Component {

  static propTypes = {
    onClose: PropTypes.func,
    data: PropTypes.object,
  }

  render () {
    const { data, } = this.props;
    const dateString = data ? data.date : defaultDate();
    return (
      <Mutation
        query={data ? UPDATE_FUND : CREATE_FUND}
        onError={({ status, statusText, }) => addToast(`${status} ${statusText}`)}
      >
        {({ onSubmit, }) => (
          <React.Fragment>
            <Form
              onSubmit={input => onSubmit({ id: data && data.id, input, })}
              onClose={this.props.onClose}
            >
              <Field
                name='name'
                type='text'
                label='Name'
                placeholder='eg. Prisma Kokkola'
                value={data ? data.name : ''}
                validate={validateName}
              />
              <Field
                name='amount'
                type='number'
                label='Amount'
                placeholder='xxx,xx'
                value={data ? data.amount : ''}
                validate={validateAmount}
                min='0'
                step='0.01'
              />
              <Field
                name='isIncome'
                type='checkbox'
                placeholder='xxx,xx'
                value={data ? data.isIncome : false}
                onValue={'Income'}
                offValue={'Expense'}
                toggle />
              <Field
                name='date'
                type='date'
                placeholder='date'
                value={dateString.slice(0, dateString.indexOf('T'))}
              />
              <div style={{ display: 'flex', flexDirection: 'column', }}>
                {!data && <Field type='submit' value='Submit & Add' submit reset />}
                <Field type='submit' value='Submit & Close' submit close />
                <Field type='submit' value='Close' close />
              </div>
            </Form>
          </React.Fragment>
        )}
      </Mutation>
    );
  }

}


export default BudgetAdd;
