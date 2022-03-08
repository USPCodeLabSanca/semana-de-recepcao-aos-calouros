import React, {useEffect, useState} from 'react';

import {useHistory} from 'react-router-dom';

import Hero from '../components/hero';
import Presentation from '../components/presentation';
// import Highlights from '../components/highlights';
// import Live from '../components/live';
// import Eventos from '../components/eventos';
import Programacao from '../components/programacao';
import Services from '../components/services';
import Flyer from '../components/flyer';
import Celebration from '../components/celebration';
import Footer from '../components/footer';
import API from '../lib/api';

/**
 * Home Page
 *
 * @return {void}
 */
export default function Home() {
  const programacaoComponent = React.useRef();
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

  React.useEffect(() => {
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
      <Presentation />
      {/* <Highlights /> */}
      {/* <Live url={data && data.URL_Live} /> */}
      {/* <Eventos /> */}
      <span ref={programacaoComponent} />
      {
        data && data.Eventos &&
        <Programacao events={data.Eventos} />
      }
      <Services />
      <Flyer />
      <Celebration />
      <Footer />
    </main>
  );
}
