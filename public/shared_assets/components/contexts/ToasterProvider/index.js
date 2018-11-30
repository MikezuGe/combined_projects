import React from 'react';
import PropTypes from 'prop-types';

import { Toaster, } from '../../organisms';


const ToasterContext = React.createContext(Toaster);
const ToasterConsumer = ToasterContext.Consumer;


export default class ToasterProvider extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  toaster = null

  addToast = toast => this.toaster.addToast(toast)

  render () {
    const { children, } = this.props;
    return (
      <ToasterContext.Provider value={{ addToast: this.addToast, }}>
        <React.Fragment>
          {children}
          <Toaster ref={toasterRef => (this.toaster = toasterRef)} />
        </React.Fragment>
      </ToasterContext.Provider>
    );
  }

}


export { ToasterConsumer, };
