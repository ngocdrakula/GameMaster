import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Navbar from './modules/Navbar';

import Game from './components/Game';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';


import 'bootstrap/dist/css/bootstrap.min.css';
import './gamemaster.css';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container-md container-xs">
          <Router>
            <Switch>
              <Route path="/game/:game?/:version?" component={Game} />
              <Route path="/:id" component={ErrorPage}/>
              <Route path="/"component={Home}/>
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

