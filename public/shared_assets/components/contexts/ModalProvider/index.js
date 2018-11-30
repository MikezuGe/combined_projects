import React from 'react';
import PropTypes from 'prop-types';

import { Modal, } from '../../organisms';


const ModalContext = React.createContext();
const ModalConsumer = ModalContext.Consumer;


export default class ModalProvider extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  modal = null

  openModal = props => this.modal.openModal(props)

  render () {
    const { children, } = this.props;
    return (
      <ModalContext.Provider value={{ openModal: this.openModal, }}>
        <React.Fragment>
          {children}
          <Modal ref={modalRef => (this.modal = modalRef)} />
        </React.Fragment>
      </ModalContext.Provider>
    );
  }

}


export { ModalConsumer, };
