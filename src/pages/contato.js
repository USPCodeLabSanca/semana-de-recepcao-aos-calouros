import React from 'react';

import SectionHeader from '../components/section-header';
import Footer from '../components/footer';

/**
 * Contato Page
 *
 * @return {void}
 */
export default function Contato() {
  return (<main className='bg-primary pt-20'>
    <SectionHeader title='Contato' />
    <div className='container mx-auto mb-6 p-8 bg-white color-black shadow-md'>
      <h1 className='text-xl md:text-2xl lg:text-4xl font-bold pb-4'>Serviço de Graduação</h1>
      <p className='text-base md:text-lg lg:text-xl'>Atendendo normalmente pelos canais:</p>
      <p className='text-base md:text-lg lg:text-xl'>Telefone: (16) 3373-9639</p>
      <p className='text-base md:text-lg lg:text-xl'>Instagram: <a
        rel='noreferrer noopener'
        className='text-blue-700 hover:underline break-all'
        href='https://www.instagram.com/graduacao.icmc.usp/'
        target="_blank"
      >@graduacao.icmc.usp</a></p>
      <p className='text-base md:text-lg lg:text-xl pb-8'>E-mail:<br />
        <b>BCC</b>: <a
          className='text-blue-700 hover:underline break-all'
          href='mailto:secbcc@icmc.usp.br'
        >secbcc@icmc.usp.br</a><br />
        <b>BECD</b>: <a
          className='text-blue-700 hover:underline break-all'
          href='mailto:secbecd@icmc.usp.br'
        >secbecd@icmc.usp.br</a><br />
        <b>BCDados</b>: <a
          className='text-blue-700 hover:underline break-all'
          href='mailto:secbcdados@icmc.usp.br'
        >secbcdados@icmc.usp.br</a><br />
        <b>BMA, LMA</b>: <a
          className='text-blue-700 hover:underline break-all'
          href='mailto:secmat@icmc.usp.br'
        >secmat@icmc.usp.br</a><br />
        <b>BMACC</b>: <a
          className='text-blue-700 hover:underline break-all'
          href='mailto:secbmacc@icmc.usp.br'
        >secbmacc@icmc.usp.br</a><br />
        <b>BSI</b>: <a
          className='text-blue-700 hover:underline break-all'
          href='mailto:secbsi@icmc.usp.br'
        >secbsi@icmc.usp.br</a><br />
        <b>EC/LCE</b>: <a
          className='text-blue-700 hover:underline break-all'
          href='mailto:grad@icmc.usp.br'
        >grad@icmc.usp.br</a><br />
        <b>Estágio</b>: <a
          className='text-blue-700 hover:underline break-all'
          href='mailto:estagiograd@icmc.usp.br'
        >estagiograd@icmc.usp.br</a><br />
        <b>Comunidade externa ao ICMC e à USP</b>: <a
          className='text-blue-700 hover:underline break-all'
          href='mailto:grad@icmc.usp.br'
        >grad@icmc.usp.br</a>
      </p>
      <iframe
        title='Mapa para bloco 3 - serviço de graduação'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2578.1624193079933!2d-47.896421983296484!3d-22.007266332805106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b877325a2f2381%3A0x7923e6d8ad682ad1!2sICMC%20-%20Instituto%20De%20Ci%C3%AAncias%20Matem%C3%A1ticas%20e%20de%20Computa%C3%A7%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1579794628095!5m2!1spt-BR!2sbr'
        width='100%'
        height='400px'
        allowFullScreen
        style={{ border: 0 }}>
      </iframe>
    </div>
    <Footer />
  </main>);
}
