import React from 'react';

import { addToast, openModal, modalFormTypes, } from '../../layout';


class Home extends React.Component {

  render () {
    return (
      <React.Fragment>
        <div onClick={() => addToast('Toast text')}>
          Try toast
        </div>
        <div onClick={() => openModal(modalFormTypes.BUDGET_ADD)}>
          Try modal
        </div>
      </React.Fragment>
    );
  }
}


export default Home;
