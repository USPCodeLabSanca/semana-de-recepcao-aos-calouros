import React from 'react'

import { useLocation } from 'react-router-dom'

import HeaderBG from '../images/header-bg.jpg'
import Logo from '../images/logo.png'

const style = {
  root: 'h-64 overflow-hidden',
  top: 'flex items-center ml-20 pt-6',
  image: 'w-20 h-20 mr-12',
  bgImage: 'absolute t-0 z-1 h-64 w-full object-cover',
  link: 'mx-4 text-white font-bold text-sm',
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
        src={HeaderBG}
        className={style.bgImage}
        style={{ height: pathname === '/' ? '100vh' : '' }}
      />
      <div className={style.top}>
        <a href='/'><img src={Logo} className={style.image} /></a>
        <a href='/disque-trote' className={style.link}>DISQUE-TROTE</a>
        <a href='/contato' className={style.link}>CONTATO</a>
      </div>
      <div className={style.label}>{label}</div>
    </header>
  )
}

export default Header
