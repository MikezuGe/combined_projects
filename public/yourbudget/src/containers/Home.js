import React from 'react';

import { addToast, } from 'components';


class Home extends React.Component {

  render () {
    return (
      <div onClick={() => addToast({ text: 'Toast text', })}>
        Home
      </div>
    );
  }
}


export default Home;
