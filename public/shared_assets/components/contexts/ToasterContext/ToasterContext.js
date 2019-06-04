import React, { useRef, useState, } from 'react';
import PropTypes from 'prop-types';

import { Toaster, } from '../../organisms';


const ToasterContext = React.createContext(Toaster);


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


const ToasterProvider = ({ children, }) => {
  const [ ref, setRef, ] = useChildFunction(null);

  return (
    <>
      <ToasterContext.Provider value={{ addToast: ref.current, }}>
        {ref.current && children}
      </ToasterContext.Provider>
      <Toaster>
        {({ addToast, }) => (setRef(addToast), undefined)}
      </Toaster>
    </>
  );
}

ToasterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};


export { ToasterProvider, };
export default ToasterContext;
