import React from 'react';

import ReactPlayer from 'react-player';

import SectionHeader from './section-header';

/**
 * Live
 *
 * @return {void}
 */
export default function Live({url}) {
  return (
    <div>
      <SectionHeader title='Programação ao vivo' subTitle={<p>A sua recepção começa aqui, <b>todos os dias</b>, sempre às <b>9 horas</b>.</p>} />
      <div className='bg-primary px-8 pb-8'>
        { url ? (<ReactPlayer
          className='h-screen-without-navbar shadow'
          width='100%'
          url={url}
        />) : (<div className='px-8 py-24 md:py-48'>
          <p className='text-4xl text-center'>
            <b>Sem eventos acontecendo ao vivo agora. Confira a programação abaixo.</b>
          </p>
        </div>)}
      </div>
    </div>
  );
}
