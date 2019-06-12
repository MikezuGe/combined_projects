import React, { lazy, Suspense, useState, useEffect, } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import axios from 'axios';

import { ThemeProvider, } from '@components/contexts';


const globalStyle = ({ theme, }) => `
* {
  font-family: 'Ubuntu', sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  /*
  color: white;
  text-shadow:
    2px 0 0 #000,
    -2px 0 0 #000,
    0 2px 0 #000,
    0 -2px 0 #000,
    1px 1px #000,
    -1px -1px #000,
    -1px 1px #000,
    1px -1px #000;
  */
}

html, body {
  overflow: hidden;
}

#root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 15% 85%;
  ${theme.breakpoints([ 'xs', 'sm', ], `
  grid-template-columns: 0% 100%;
  grid-template-rows: 0% 100%;
  `)}
  grid-template-areas:
    "header main"
    "sidebar main";
}
`;


//const Voronoi = lazy(() => import(`./Voronoi`));
const loadComponent = r => lazy(() => import(`./${r}`));


const App = () => {
  const [ routes, setRoutes, ] = useState([]);

  const getRoutes = async () => {
    const result = await axios.post(`${window.location.origin}/api/test`, {}, {
      headers: {
        ['Content-Type']: 'application/json',
      },
    });
    setRoutes(result.data.map(fileName => fileName.slice(0, fileName.lastIndexOf('.js'))));
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return (
    <BrowserRouter basename={'/tests'} >
      <Suspense fallback={<div>{'Loading...'}</div>}>
        <Switch>
          {routes.map(r => (
            <Route
              key={r}
              exact
              path={`/${r}`}
              component={loadComponent('Voronoi')}
            />
          ))}
          <Route
            exact
            path={'/'}
            render={() => (
              <div>
                {routes.map(r => (
                  <a
                    key={r}
                    href={r}
                  >
                    {r}
                  </a>
                ))}
              </div>
            )}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <ThemeProvider globalStyle={globalStyle}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

