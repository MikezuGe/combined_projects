import React from 'react';

import { addToast, } from 'components';


class Home extends React.Component {

  render () {
    return (
      <div onClick={() => addToast('Toast text', { timeout: 2500, })}>
        Home button
      </div>
    );
  }
}


export default Home;
