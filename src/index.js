import React from 'react';
import ReactDOM from 'react-dom';

import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

import Home from './pages/home';
import DisqueTrote from './pages/disque-trote';
import Contato from './pages/contato';
import Navbar from './components/navbar';

import './main-style.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e68d13',
    },
    secondary: {
      main: '#fafafa',
    },
  },
});

/**
 * App Component
 *
 * @return {void}
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/disque-trote' component={DisqueTrote} />
          <Route exact path='/contato' component={Contato} />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
