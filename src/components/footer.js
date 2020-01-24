import React from 'react'

import Image from '../images/logo.png'

const style = {
  root: 'bg-dark w-full h-48 text-center flex flex-col justify-center items-center',
  image: 'w-20 h-20 mb-4',
  link: 'text-blue pl-1 link',
  text: 'text-xs text-white'
}

export default function Footer () {
  return (
    <div className={style.root}>
      <img alt='Logo da semana de recepção' src={Image} className={style.image} style={{objectFit: 'contain'}} />
      <p className={style.text}>
        Feito com ❤ pelo
        <a href='http://uclsanca.icmc.usp.br/' rel='noreferrer noopener' className={style.link}>
          CodeLab
        </a>
      </p>
      <p className={style.text}>
        ©2020 Instituto de Ciências Matemáticas e de Computação
      </p>
    </div>
  )
}
