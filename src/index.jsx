import React from 'react';
import { createRoot } from 'react-dom/client';

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
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
          <Routes>
            <Route path='/' element={
              <React.Suspense fallback={<>Loading</>}>
                <Home />
              </React.Suspense>
            } />
            <Route path='/disque-trote' element={
              <React.Suspense fallback={<>Loading</>}>
                <DisqueTrote />
              </React.Suspense>
            } />
            <Route path='/contato' element={
              <React.Suspense fallback={<>Loading</>}>
                <Contato />
              </React.Suspense>
            } />
            <Route path='/servicos/:service' element={
              <React.Suspense fallback={<>Loading</>}>
                <Servicos />
              </React.Suspense>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
