import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Hero from '../components/hero';
import WorkInProgress from './work-in-progress';
import Programacao from '../components/programacao';
const Services = React.lazy(() => import('../components/services'));
const Flyer = React.lazy(() => import('../components/flyer'));
const Footer = React.lazy(() => import('../components/footer'));
import API from '../lib/api';
import { events as defaultEvents } from '../lib/schedule-data/events';

/**
 * Home Page
 *
 * @return {void}
 */
export default function Home() {
  const programacaoComponent = useRef();
  const [scheduleEvents, setScheduleEvents] = useState(defaultEvents);
  const { location: { hash }, replace } = useHistory();

  // Load active dynamic schedule from SQLite backend
  useEffect(() => {
    let isMounted = true;
    API.schedule.getActive()
        .then((res) => {
          if (isMounted && res && res.events && res.events.length > 0) {
            setScheduleEvents(res.events);
          }
        })
        .catch((err) => {
          console.warn('Using local fallback schedule dataset:', err.message);
        });

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Scroll to 'Programacao'
   *
   * @return {void}
   */
  function moveScreenToProgramacao() {
    if (programacaoComponent.current) {
      const top = programacaoComponent.current.offsetTop;
      window.scrollTo({ top, behavior: 'smooth' });
      replace('/');
    }
  }

  useEffect(() => {
    if (hash === '#programacao') {
      if (document.readyState === 'complete') {
        moveScreenToProgramacao();
      } else {
        window.addEventListener('load', moveScreenToProgramacao);
        return () => window.removeEventListener('load', moveScreenToProgramacao);
      }
    }
  }, [hash]);

  return (
    <main>
      <Hero />
      <span id="programacao" ref={programacaoComponent} />
      {
        scheduleEvents ? (
          <Programacao events={scheduleEvents} />
        ) : (
          <WorkInProgress />
        )
      }
      <React.Suspense fallback={<p>Loading</p>}>
        <div id="servicos">
          <Services />
        </div>
        <Flyer />
        <Footer />
      </React.Suspense>
    </main>
  );
}
