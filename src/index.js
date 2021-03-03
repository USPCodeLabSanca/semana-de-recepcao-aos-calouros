import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';

import Home from './pages/home';
import DisqueTrote from './pages/disque-trote';
import Contato from './pages/contato';

import './main-style.css';

/**
 * App Component
 *
 * @return {void}
 */
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/disque-trote' component={DisqueTrote} />
        <Route exact path='/contato' component={Contato} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
