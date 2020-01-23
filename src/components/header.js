import React from 'react'

import { useLocation, Link } from 'react-router-dom'

import HeaderBG from '../images/header-bg.jpg'
import Logo from '../images/logo.png'

const style = {
  root: 'h-64 overflow-hidden',
  top: 'flex items-center mx-4 sm:ml-20 pt-6',
  image: 'w-20 h-20 sm:mr-12 object-contain',
  bgImage: 'absolute t-0 z-1 h-64 w-full object-cover',
  link: 'mx-4 text-white font-bold text-sm text-center',
  label: 'text-3xl font-bold text-center my-4 text-white'
}

function Header () {
  const { pathname } = useLocation()

  const label = {
    '/disque-trote': 'Disque-Trote',
    '/contato': 'Contato',
    '/': ''
  }[pathname]

  return (
    <header className={style.root}>
      <img
        alt='Foto do icmc'
        src={HeaderBG}
        className={style.bgImage}
        style={{ height: pathname === '/' ? '100vh' : '' }}
      />
      <div className={style.top}>
        <Link to='/'><img
          src={Logo}
          alt="Logo da recepção escrito 'Chega mais'"
          className={style.image}
        /></Link>
        <Link to='/disque-trote' className={style.link}>DISQUE-TROTE</Link>
        <Link to='/contato' className={style.link}>CONTATO</Link>
      </div>
      <div className={style.label}>{label}</div>
    </header>
  )
}

export default Header
