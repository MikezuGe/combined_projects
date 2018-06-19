import React, { Component, } from 'react';
import PropTypes from 'prop-types';


const meta = { submitted: false, changed: false, pristine: true, valid: false, error: undefined, };


class Form extends Component {

  state = {};

  static getDerivedStateFromProps = props => props.children.reduce((total, field) => {
    const { name, type, value, } = field.props;
    if (!name) {
      throw new Error(`Form field doesn't have a name prop: ${field.props}`);
    }
    if (type === 'submit') {
      return total;
    }
    total[name] = {
      value: value || (type === 'toggleswitch' ? false : ''),
      meta: { ...meta, },
    }
    return total;
  }, {});

  isValid () {
    for (let field of Object.values(this.state)) {
      if (!field.meta.valid) {
        return false;
      }
    }
    return true;
  }

  onChange = (name, value, meta) => {
    this.setState({ [name]: { value, meta, }, });
  }

  onSubmit = () => {
    this.setState(prevState => {
      Object.values(prevState).forEach(field => {
        field.meta.submitted = true;
        field.meta.changed = false;
      });
      return prevState;
    });

    if (this.isValid()) {
      this.props.onSubmit(Object.entries(this.state).reduce((total, [key, content]) => {
        total[key] = content.value;
        return total;
      }, {}));
    }
  }

  render() {
    return (
      <div>
        { this.props.children.map((field, i) => field.props.type === 'submit'
          ? <field.type 
            key={i}
            {...field.props}
            value={field.props.value}
            onSubmit={this.onSubmit}
          />
          : <field.type
            key={i}
            {...field.props}
            {...this.state[field.props.name]}
            onChange={this.onChange}
          />) }
      </div>
    );
  }

}


Form.propTypes = {
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
}


export default Form;