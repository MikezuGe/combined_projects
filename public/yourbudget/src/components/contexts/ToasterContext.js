import React from 'react';
import Proptypes from 'prop-types';

import { Toaster, } from '../organisms';


const ToasterContext = React.createContext();


export default class ToasterContextProvider extends React.Component {

  static propTypes = {
    children: Proptypes.element.isRequired,
  }
  toaster = null

  addToast = (text, options) => {
    this.toaster.addToast(text, options);
  }

  render () {
    return (
      <ToasterContext.Provider value={{
        addToast: this.addToast,
      }}>
        {this.props.children}
        <Toaster ref={toaster => (this.toaster = toaster)} />
      </ToasterContext.Provider>
    )
  }

}


export const ToasterContextConsumer = ToasterContext.Consumer;
