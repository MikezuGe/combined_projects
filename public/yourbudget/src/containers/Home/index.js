import React from 'react';

import { Desktop, } from '../../components/pages';
import { addToast, openModal, modalFormTypes, } from '../../components/organisms';


class Home extends React.Component {

  render () {
    return (
      <Desktop>
        <div onClick={() => addToast('Toast text')}>
          Try toast
        </div>
        <div onClick={() => openModal(modalFormTypes.BUDGET_ADD)}>
          Try modal
        </div>
      </Desktop>
    );
  }
}


export default Home;
