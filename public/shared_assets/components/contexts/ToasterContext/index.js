import React from 'react';
import PropTypes from 'prop-types';

import { Toaster, addToast, } from '../../organisms';


const ToasterContext = React.createContext(Toaster);
const ToasterConsumer = ToasterContext.Consumer;


const ToasterProvider = ({ children, }) => (
  <ToasterContext.Provider value={{ addToast, }}>
    <React.Fragment>
      {children}
      <Toaster />
    </React.Fragment>
  </ToasterContext.Provider>
);

ToasterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};


export { ToasterConsumer, ToasterProvider, };
export default ToasterContext;
