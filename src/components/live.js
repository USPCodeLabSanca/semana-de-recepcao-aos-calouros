import React from 'react';

import ReactPlayer from 'react-player';

import SectionHeader from './section-header';

/**
 * Live
 *
 * @return {void}
 */
export default function Live() {
  return (
    <div>
      <SectionHeader title='Programação ao vivo' subTitle={<p>A sua recepção começa aqui, <b>todos os dias</b>, sempre às <b>9 horas</b>.</p>} />
      <div className='bg-primary px-8 pb-8'>
        <ReactPlayer
          className='h-screen-without-navbar shadow'
          width='100%'
          url='https://youtu.be/6YJko0hJzPw'
        />
      </div>
    </div>
  );
}
