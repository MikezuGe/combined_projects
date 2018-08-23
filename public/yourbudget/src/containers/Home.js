import React from 'react';

import { addToast, } from 'components';


class Home extends React.Component {

  render () {
    return (
      <div onClick={() => addToast('Toast text')}>
        Home button
      </div>
    );
  }
}


export default Home;
