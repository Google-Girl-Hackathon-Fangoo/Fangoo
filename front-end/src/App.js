import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Login from './Login'

function App() {
  return (
    <Router>
        <Switch>
          <Route path='/'>
            <Login />
          </Route>
          <Redirect to='/' />
        </Switch>
    </Router>
  );
}

export default App;
