import React from 'react';

import { addToast, } from 'components';
import { openModal, } from 'components';


class Home extends React.Component {

  render () {
    return (
      <React.Fragment>
        <div onClick={() => addToast('Toast text')}>
          Try toast
        </div>
        <div onClick={() => openModal('Some form type')}>
          Try modal
        </div>
      </React.Fragment>
    );
  }
}


export default Home;
