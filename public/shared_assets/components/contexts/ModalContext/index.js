import React from 'react';
import PropTypes from 'prop-types';

import { Modal, openModal, } from '../../organisms';


const ModalContext = React.createContext();
const ModalConsumer = ModalContext.Consumer;


const ModalProvider = ({ children, }) => (
  <ModalContext.Provider value={{ openModal, }}>
    <React.Fragment>
      {children}
      <Modal />
    </React.Fragment>
  </ModalContext.Provider>
);

ModalProvider.propTypes = {
  children: PropTypes.element.isRequired,
};


export { ModalConsumer, };
export default ModalProvider;
