import React, {useEffect, useState, useRef} from 'react';

import {useHistory} from 'react-router-dom';

import Hero from '../components/hero';
// import Presentation from '../components/presentation';
// import Highlights from '../components/highlights';
// import Live from '../components/live';
// import Eventos from '../components/eventos';
import Programacao from '../components/programacao';
const Services = React.lazy(()=> import('../components/services'));
const Flyer = React.lazy(()=> import('../components/flyer'));
const Footer = React.lazy(()=> import('../components/footer'));
import API from '../lib/api';

/**
 * Home Page
 *
 * @return {void}
 */
export default function Home() {
  const programacaoComponent = useRef();
  const [data, setData] = useState();

  const {location: {hash}, replace} = useHistory();


  useEffect(() => {
    const fetchData = async () => {
      const response = await API.home.get();
      setData(response);
    };

    fetchData();
  }, []);

  /**
   * Scroll to 'Programacao'
   *
   * @return {void}
   */
  function moveScreenToProgramacao() {
    const top = programacaoComponent.current.offsetTop;
    window.scrollTo({top, behavior: 'smooth'});
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
        data && data.Eventos &&
        <Programacao events={data.Eventos} />
      }
      <React.Suspense fallback={<p>Loading</p>}>
        <Services />
        <Flyer />
        <Footer />
      </React.Suspense>
    </main>
  );
}
