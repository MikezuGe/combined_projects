import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, } from 'react-router-dom';
import { injectGlobal, } from 'styled-components';

import { Main, Header, Sidebar, Modal, Toaster, } from './layout';


injectGlobal`
* {
  font-family: 'Ubuntu', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
  /*
  color: white;
  text-shadow: 2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px #000, -1px 1px #000, 1px -1px #000;
  */
}

html body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#root {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 15% 85%;
  grid-template-areas:
    "header main"
    "sidebar main";
}`;


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
