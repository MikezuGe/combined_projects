import React from 'react';
import PropTypes from 'prop-types';

import { ToasterContextConsumer, } from '../../components/contexts';
import { Form, } from '../../components/organisms';
import { Field, } from '../../components/molecules';

import { Mutation, CREATE_FUNDS, UPDATE_FUNDS, } from '../../queries';


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

const defaultDateString = () => new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString();
const parseDate = dateString => dateString.slice(0, dateString.indexOf('T'))


class BudgetAdd extends React.Component {

/**
 * @description Some description for class
 */

  static propTypes = {
    onClose: PropTypes.func,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  render () {
    const { data: { id, name, amount, isIncome, date, }, } = this.props;
    return (
      <ToasterContextConsumer>
        {({ addToast, }) => (
          <Mutation
            query={id ? UPDATE_FUNDS : CREATE_FUNDS}
            onError={({ status, statusText, }) => addToast(`${status} ${statusText}`)}
          >
            {({ onSubmit, }) => (
              <Form
                onSubmit={input => onSubmit({ id, input, })}
                onClose={this.props.onClose}
              >
                <Field
                  name='name'
                  type='text'
                  label='Name'
                  placeholder='eg. Prisma Kokkola'
                  value={name || ''}
                  validate={validateName}
                />
                <Field
                  name='amount'
                  type='number'
                  label='Amount'
                  placeholder='xxx,xx'
                  value={amount || ''}
                  validate={validateAmount}
                  min='0'
                  step='0.01'
                />
                <Field
                  name='isIncome'
                  type='checkbox'
                  placeholder='xxx,xx'
                  value={!!isIncome}
                  onValue={'Income'}
                  offValue={'Expense'}
                  toggle />
                <Field
                  name='date'
                  type='date'
                  placeholder='date'
                  value={parseDate(date || defaultDateString())}
                />
                <div style={{ display: 'flex', flexDirection: 'column', }}>
                  {!id && <Field type='submit' value='Submit & Add' submit reset />}
                  <Field type='submit' value='Submit & Close' submit close />
                  <Field type='submit' value='Close' close />
                </div>
              </Form>
            )}
          </Mutation>
        )}
      </ToasterContextConsumer>
    );
  }

}


export default BudgetAdd;
