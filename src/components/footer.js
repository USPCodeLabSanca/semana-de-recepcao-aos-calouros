import React from 'react'

import Image from '../images/logo.png'

const style = {
  root: 'bg-dark w-full h-40 text-center flex flex-col justify-center items-center',
  image: 'w-20 h-20 mb-4',
  text: 'text-xs text-white'
}

export default function Footer () {
  return (
    <div className={style.root}>
      <img src={Image} className={style.image} />
      <p className={style.text}>
        © 2020 Instituto de Ciências Matemáticas e de Computação
      </p>
    </div>
  )
}
