import React from 'react';

import ReactPlayer from 'react-player';
import {useHistory} from 'react-router-dom';

import SectionHeader from '../components/section-header';
import Faq from '../components/faq';
import Footer from '../components/footer';

const services = {
  'servico-de-graduacao': {
    title: 'Serviço de Graduação',
    videoUrl: 'https://youtu.be/4B7NOctCnW4',
    faq: [
      {
        question: 'Pergunta 1',
        answer: 'Resposta 1',
      },
      {
        question: 'Pergunta 2',
        answer: 'Resposta 2',
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
  'biblioteca': {
    title: 'Biblioteca',
    videoUrl: 'https://youtu.be/4B7NOctCnW4',
    faq: [
      {
        question: 'Pergunta 1',
        answer: 'Resposta 1',
      },
      {
        question: 'Pergunta 2',
        answer: 'Resposta 2',
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
  'assistencia-social': {
    title: 'Assistência Social',
    videoUrl: 'https://youtu.be/4B7NOctCnW4',
    faq: [
      {
        question: 'Pergunta 1',
        answer: 'Resposta 1',
      },
      {
        question: 'Pergunta 2',
        answer: 'Resposta 2',
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
  'informatica': {
    title: 'Informática',
    videoUrl: 'https://youtu.be/4B7NOctCnW4',
    faq: [
      {
        question: 'Pergunta 1',
        answer: 'Resposta 1',
      },
      {
        question: 'Pergunta 2',
        answer: 'Resposta 2',
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
  'comunicacao': {
    title: 'Comunicação',
    videoUrl: 'https://youtu.be/4B7NOctCnW4',
    faq: [
      {
        question: 'Pergunta 1',
        answer: 'Resposta 1',
      },
      {
        question: 'Pergunta 2',
        answer: 'Resposta 2',
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
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
      <div className='container-16-9'>
        <ReactPlayer
          className='absolute inset-0 h-full-important shadow'
          width='100%'
          url={services[service].videoUrl}
        />
      </div>
      <div className='pt-8'>
        <Faq items={services[service].faq}></Faq>
      </div>
    </div>
    <Footer />
  </main>);
}
