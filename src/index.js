import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'
import Authorization from './Components/Authorization';
import Home from './Components/Home';
import Login from './Components/Login';
import Board from './Components/Board';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <PrivateRoute exact path="/login" component={Login} />
        <Authorization>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/board/:id" component={Board} />
          </Switch>
        </Authorization>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
