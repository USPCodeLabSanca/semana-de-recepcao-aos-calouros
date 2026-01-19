import React, { useEffect, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import Hero from '../components/hero';
// import Presentation from '../components/presentation';
// import Highlights from '../components/highlights';
// import Live from '../components/live';
// import Eventos from '../components/eventos';
import WorkInProgress from './work-in-progress';
import Programacao from '../components/programacao';
const Services = React.lazy(() => import('../components/services'));
const Essentials = React.lazy(() => import('../components/essentials'));
const Flyer = React.lazy(() => import('../components/flyer'));
const Footer = React.lazy(() => import('../components/footer'));
// import API from '../lib/api';

// import {events} from '../lib/schedule-data/events';
const events = false;

/**
 * Home Page
 *
 * @return {void}
 */
export default function Home() {
  const programacaoComponent = useRef();
  // const [data, setData] = useState();

  const { location: { hash }, replace } = useHistory();


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await API.home.get();
  //     setData(response);
  //   };

  //   fetchData();
  // }, []);

  /**
   * Scroll to 'Programacao'
   *
   * @return {void}
   */
  function moveScreenToProgramacao() {
    const top = programacaoComponent.current.offsetTop;
    window.scrollTo({ top, behavior: 'smooth' });
    replace('/');
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
      {/* <Presentation /> */}
      {/* <Highlights /> */}
      {/* <Live url={data && data.URL_Live} /> */}
      {/* <Eventos /> */}
      <span ref={programacaoComponent} />
      {
        events ? (
          <Programacao events={events} />
        ) : (
          <WorkInProgress />
        )
      }
      <React.Suspense fallback={<p>Loading</p>}>
        <Services />
        <Essentials />
        <Flyer />
        <Footer />
      </React.Suspense>
    </main>
  );
}
