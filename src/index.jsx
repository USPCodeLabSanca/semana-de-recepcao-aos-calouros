import React from 'react';
import { createRoot } from 'react-dom/client';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Home = React.lazy(() => import('./pages/home'));
const DisqueTrote = React.lazy(() => import('./pages/disque-trote'));
const Contato = React.lazy(() => import('./pages/contato'));
const Servicos = React.lazy(() => import('./pages/servicos'));
import Navbar from './components/navbar';
import ScrollToTop from './lib/scroll-to-top';

import './main-style.css';

const theme = createTheme({
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
        <ScrollToTop>
          <Switch>
            <React.Suspense fallback={<>Loading</>}>
              <Route exact path='/' component={Home} />
              <Route exact path='/disque-trote' component={DisqueTrote} />
              <Route exact path='/contato' component={Contato} />
              <Route exact path='/servicos/:service' component={Servicos} />
            </React.Suspense>
            <Redirect to='/' />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
