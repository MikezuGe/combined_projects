import React from 'react';

import { ToasterContextConsumer, ModalContextConsumer } from '../../components/contexts';
import { Desktop, } from '../../components/pages';


class Home extends React.Component {

  render () {
    return (
      <ToasterContextConsumer>
        {({ addToast, }) => (
          <ModalContextConsumer>
            {({ openModal }) => (
              <Desktop>
                <div onClick={() => addToast('asdasd')}>Home</div>
                <div onClick={() => openModal({ component: () => <div>asdasdsd</div> })}>asdasd</div>
              </Desktop>
            )}
          </ModalContextConsumer>
        )}
      </ToasterContextConsumer>
    );
  }
}


export default Home;
