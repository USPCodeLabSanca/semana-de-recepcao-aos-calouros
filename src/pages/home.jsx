import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Hero from '../components/hero';
import WorkInProgress from './work-in-progress';
import Programacao from '../components/programacao';
const Services = React.lazy(() => import('../components/services'));
const Flyer = React.lazy(() => import('../components/flyer'));
const Footer = React.lazy(() => import('../components/footer'));
import API from '../lib/api';

/**
 * Feedback shown in place of the schedule while it is loading or unavailable
 *
 * @return {JSX.Element}
 */
function ScheduleStatus({ status, onRetry }) {
  return (
    <div className='flex flex-col items-center justify-center gap-4 bg-secondary py-24 md:py-12 px-6 text-center'>
      {status === 'loading' ? (
        <p className='font-bold text-white text-lg sm:text-xl md:text-2xl'>Carregando programação...</p>
      ) : (
        <>
          <p className='font-bold text-white text-lg sm:text-xl md:text-2xl'>
            Não foi possível carregar a programação.
          </p>
          <button
            type='button'
            onClick={onRetry}
            className='px-5 py-2 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors'
          >
            Tentar novamente
          </button>
        </>
      )}
    </div>
  );
}

/**
 * Home Page
 *
 * @return {void}
 */
export default function Home() {
  const programacaoComponent = useRef();
  const [scheduleEvents, setScheduleEvents] = useState([]);
  // 'loading' | 'ready' | 'empty' | 'error'
  const [scheduleStatus, setScheduleStatus] = useState('loading');
  const { location: { hash }, replace } = useHistory();

  // The published schedule lives only in the backend; there is no local fallback
  const loadSchedule = useCallback(() => {
    let isMounted = true;
    setScheduleStatus('loading');
    API.schedule.getActive()
        .then((res) => {
          if (!isMounted) return;
          // A static host without the API answers with index.html instead of JSON
          if (!Array.isArray(res?.events)) {
            throw new Error('Resposta inválida da API de cronograma');
          }
          const events = res.events;
          setScheduleEvents(events);
          setScheduleStatus(events.length > 0 ? 'ready' : 'empty');
        })
        .catch((err) => {
          if (!isMounted) return;
          if (err.response?.status === 404) {
            setScheduleStatus('empty');
          } else {
            console.error('Failed to load schedule:', err.message);
            setScheduleStatus('error');
          }
        });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => loadSchedule(), [loadSchedule]);

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
      {scheduleStatus === 'ready' && <Programacao events={scheduleEvents} />}
      {scheduleStatus === 'empty' && <WorkInProgress />}
      {(scheduleStatus === 'loading' || scheduleStatus === 'error') && (
        <ScheduleStatus status={scheduleStatus} onRetry={loadSchedule} />
      )}
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
