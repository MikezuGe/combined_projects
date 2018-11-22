import React from 'react';
import PropTypes from 'prop-types';


export default class Mutation extends React.Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    loading: false,
    error: null,
  }

  render () {
    const { children, } = this.props;
    const { loading, error, } = this.state;
    return (
      <div>
        {children({
          loading,
          error,
        })}
      </div>
    );
  }

}
