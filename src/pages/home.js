import React from 'react';

import {useHistory} from 'react-router-dom';

import Header from '../components/header';
import Countdown from '../components/countdown';
import Eventos from '../components/eventos';
import Flyer from '../components/flyer';
import Programacao from '../components/programacao';
import LinksImportantes from '../components/links-importantes';
import Footer from '../components/footer';

/**
 * Home Page
 *
 * @return {void}
 */
export default function Home() {
  const programacaoComponent = React.useRef();

  const {location: {hash}, replace} = useHistory();

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
    <div>
      <Header />
      <Countdown />
      <Flyer />
      <Eventos />
      <span ref={programacaoComponent} />
      <Programacao />
      <LinksImportantes />
      <Footer />
    </div>
  );
}
