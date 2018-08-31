import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, } from 'react-router-dom';
import { Main, Header, Sidebar, Modal, Toaster, } from 'layout';
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
