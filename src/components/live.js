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
      <div className='bg-primary pt-4 pb-8'>
        <div className='container mx-auto px-8'>
          { url ? (<div className='container-16-9'>
            <ReactPlayer
              className='absolute inset-0 h-full-important shadow'
              width='100%'
              url={url}
            />
          </div>) : (<div className='py-24 md:py-48'>
            <p className='text-4xl text-center'>
              <b>Sem eventos acontecendo ao vivo agora. Confira a programação abaixo.</b>
            </p>
          </div>)}
        </div>
      </div>
    </div>
  );
}
