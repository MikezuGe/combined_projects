import React, { useRef, useState, } from 'react';
import PropTypes from 'prop-types';

import { Modal, } from '../../organisms';


const ModalContext = React.createContext();


const useChildFunction = initialValue => {
  const ref = useRef(initialValue);
  const [ hasUpdated, setHasUpdated, ] = useState(false);
  const upd = fn => {
    if (hasUpdated) {
      return;
    }
    setHasUpdated(true);
    ref.current = fn;
  };
  return [ ref, upd, ];
};


const ModalProvider = ({ children, }) => {
  const [ ref, setRef, ] = useChildFunction(null);

  return (
    <>
      <ModalContext.Provider value={{ openModal: ref.current, }}>
        {ref.current && children}
      </ModalContext.Provider>
      <Modal>
        {({ openModal, }) => (setRef(openModal), undefined)}
      </Modal>
    </>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.element.isRequired,
};


export { ModalProvider, };
export default ModalContext;
