import React from 'react';
import ReactDOM from 'react-dom';

import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

// const Home = React.lazy(()=> import('./pages/home'));
const WorkInProgress = React.lazy(()=> import('./pages/work-in-progress'));
// const DisqueTrote = React.lazy(()=> import('./pages/disque-trote'));
// const Contato = React.lazy(()=> import('./pages/contato'));
// const Servicos = React.lazy(()=> import('./pages/servicos'));
// import Navbar from './components/navbar';
import ScrollToTop from './lib/scroll-to-top';

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
        {/* <Navbar /> */}
        <ScrollToTop>
          <Switch>
            <React.Suspense fallback={<>Loading</>}>
              <Route exact path='/' component={WorkInProgress} />
              {/* <Route exact path='/' component={Home} /> */}
              {/* <Route exact path='/disque-trote' component={DisqueTrote} /> */}
              {/* <Route exact path='/contato' component={Contato} /> */}
              {/* <Route exact path='/servicos/:service' component={Servicos} /> */}
            </React.Suspense>
            <Redirect to='/' />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
