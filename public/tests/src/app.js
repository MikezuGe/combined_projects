import React, { lazy, Suspense, useState, useEffect, } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';
import axios from 'axios';


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
  <App />,
  document.getElementById('root')
);
