import React from 'react';

import ReactPlayer from 'react-player';
import {useHistory} from 'react-router-dom';

import SectionHeader from '../components/section-header';
import Faq from '../components/faq';
import Footer from '../components/footer';
import servicoDeGraduacao from '../lib/services-data/servico-de-graduacao';
import biblioteca from '../lib/services-data/biblioteca';
import assistenciaSocial from '../lib/services-data/assistencia-social';
import informatica from '../lib/services-data/informatica';
import comunicacao from '../lib/services-data/comunicacao';
import apoioPsicologico from '../lib/services-data/apoio-psicologico';

const services = {
  'servico-de-graduacao': servicoDeGraduacao,
  'biblioteca': biblioteca,
  'assistencia-social': assistenciaSocial,
  'informatica': informatica,
  'comunicacao': comunicacao,
  'apoio-psicologico': apoioPsicologico,
};

/**
 * Servicos Page
 *
 * @param {object} props
 *
 * @return {object}
 */
export default function Servicos({match: {params: {service}}}) {
  const history = useHistory();

  if (!Object.keys(services).includes(service)) {
    history.push('/');
  }

  return (<main className='bg-primary pt-20'>
    <SectionHeader title={services[service].title} />
    <div className='container mx-auto mb-6 p-8 bg-white color-black shadow-md'>
      {
        services[service].videoUrl && (
          <div className='container-16-9 inset-0 pb-8'>
            <ReactPlayer
              className='absolute inset-0 h-full-important shadow'
              width='100%'
              url={services[service].videoUrl}
            />
          </div>
        )
      }
      { services[service].text && <p className='text-sm md:text-base lg:text-lg pb-8'>
        {services[service].text}
      </p>}
      { services[service].faq && <div className=''>
        <Faq items={services[service].faq}></Faq>
      </div>}
    </div>
    <Footer />
  </main>);
}
