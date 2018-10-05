import React from 'react';

import { Desktop, } from '../../components/pages';
import { addToast, openModal, } from '../../components/organisms';


class Home extends React.Component {

  render () {
    return (
      <Desktop>
        <div onClick={() => addToast('Toast text')}>
          Try toast
        </div>
        <div onClick={() => openModal()}>
          Try modal
        </div>
      </Desktop>
    );
  }
}


export default Home;
