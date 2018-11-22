import React from 'react';


export default class Mutation extends React.Component {

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
