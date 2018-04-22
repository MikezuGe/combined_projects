import React, { Component, } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, } from 'react-router-dom';

const asd = () => <div>{'asd'}</div>;
const foo = () => <div>{'foo'}</div>;
const bar = () => <div>{'bar'}</div>;

class App extends Component {

  render = () => {
    console.log(this);
    return (
      <div>
        <Link to='/'>thisroot</Link>
        <Link to='/home'>home</Link>
        <Link to='/yolo'>yolo</Link>
        <Switch>
          <Route exact path='/' component={asd} />
          <Route path='/home' component={foo}/>
          <Route path='/yolo' component={bar}/>
        </Switch>
      </div>
    );
  }

}


ReactDOM.render(
  <Router basename='/test'>
    <App />
  </Router>,
  document.getElementById('root')
);
