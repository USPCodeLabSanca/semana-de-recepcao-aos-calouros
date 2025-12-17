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
      <SectionHeader title='Programação ao vivo' subTitle={(<p>
        Acompanhe as transmissões por aqui ou diretamente no <a rel='noreferrer noopener' className='hover:underline break-all' href='https://tv.icmc.usp.br/' target="_blank">
          Youtube
        </a>!
      </p>)} />
      <div className='bg-primary pt-4 pb-8'>
        <div className='container mx-auto px-8'>
          { url ? (<div className='container-16-9 inset-0'>
            <ReactPlayer
              className='absolute inset-0 h-full-important shadow'
              width='100%'
              url={url}
            />
          </div>) : (<div className='container-16-9 inset-0'>
            <p className='flex items-center justify-center absolute inset-0 text-4xl'>
              <b>Sem eventos acontecendo ao vivo agora. Confira a programação abaixo.</b>
            </p>
          </div>)}
        </div>
      </div>
    </div>
  );
}
