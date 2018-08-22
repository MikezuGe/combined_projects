import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, } from 'react-router-dom';
import { Main, Header, Sidebar, } from 'layout';
import { Modal, Toaster, } from 'components';
import 'style.css';


const App = () => (
  <BrowserRouter basename={'/yourbudget'}>
    <React.Fragment>
      <Header />
      <Sidebar />
      <Main />
      <Modal />
      <Toaster />
    </React.Fragment>
  </BrowserRouter>
);



ReactDOM.render(
    <App />,
  document.getElementById('root')
);
