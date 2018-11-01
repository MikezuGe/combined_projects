import React from 'react';
import Proptypes from 'prop-types';

import { Modal, } from '../organisms';


const ModalContext = React.createContext();


export default class ModalContextProvider extends React.Component {

  static propTypes = {
    children: Proptypes.element.isRequired,
  }
  modal = null

  openModal = options => {
    this.modal.openModal(options);
  }

  render () {
    return (
      <ModalContext.Provider value={{
        openModal: this.openModal,
      }}>
        {this.props.children}
        <Modal ref={modal => (this.modal = modal)} />
      </ModalContext.Provider>
    )
  }

}


export const ModalContextConsumer = ModalContext.Consumer;
