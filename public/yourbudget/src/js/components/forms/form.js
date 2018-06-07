import React, { Component, } from 'react';
import PropTypes from 'prop-types';


const isValid = fields => {
  let valid = true;
  for (const field of fields) {
    if (field.meta) {
      field.meta.submitted = true;
      field.meta.changed = false;
    }
    if (field.validate) {
      field.validate(field);
      if (field.error !== '') {
        valid = false;
      }
    }
  }
  return valid;
};


class Form extends Component {

  static getDerivedStateFromProps = props => ({ ...props.children.reduce((total, child) => {
      total[child.props.name] = { name: child.props.name, type: child.props.type, value: child.props.initialValue, };
      return total;
    }, {})
  })
  
  state = {}

  onChangeHandler = e => {
    const { name, type, value, checked, } = e.target;
    this.setState(prevState => {
      const field = prevState[name];
      field.value = type === 'checkbox' ? checked : value;
      if (field.meta) {
        field.meta.changed = true;
        field.meta.touched = true;
        field.meta.pristine = false;
      }
      return prevState;
    });
  }

  submit = () => {
    isValid();
  }

  formSubmit = () => {
  }

  clearForm = () => {
    this.setState(prevState => {
      for (const key in prevState) {
        prevState[key].value = '';
      }
      return prevState;
    });
  }

  render = () => {
    return <form className='form'>
      { this.props.children.map((field, i) => <field.Element key={field.props.name} {...field.props} value={this.state.value} onChange={e => { this.onChangeHandler(e, i); }} />) }
    </form>;
  }
}


Form.propTypes = {
  children: PropTypes.array.isRequired,
}


export default Form;
