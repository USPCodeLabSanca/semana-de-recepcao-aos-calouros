import React from 'react'

import { useLocation, Link } from 'react-router-dom'

import HeaderBG from '../images/header-bg.jpg'
import Logo from '../images/logo.png'

const style = {
  root: 'h-64 overflow-hidden pt-4',
  linkContainer: 'flex flex-col sm:flex-row sm:ml-20 items-center',
  top: 'flex items-center px-4 w-full',
  image: 'w-20 h-20 object-contain',
  bgImage: 'absolute t-0 z-1 h-64 w-full object-cover',
  link: 'mx-1 sm:mx-4 text-white font-bold text-sm w-1/3 sm:w-auto',
  label: 'text-3xl font-bold text-center my-4 text-white'
}

function Header () {
  const { pathname } = useLocation()

  const label = {
    '/disque-trote': 'Disque-Trote',
    '/contato': 'Contato',
    '/': ''
  }[pathname]

  return (<>
    <img
      alt='Foto do icmc'
      src={HeaderBG}
      className={style.bgImage}
      style={{ height: pathname === '/' ? '100vh' : '' }}
    />
    <header className={style.root}>
      <div className={style.linkContainer}>
        <Link to='/'><img
          src={Logo}
          alt="Logo da recepção escrito 'Chega mais'"
          className={style.image}
        /></Link>
        <div className={style.top}>
          <Link to='/#programacao' className={style.link + ' text-right'}>PROGRAMAÇÃO</Link>
          <Link to='/disque-trote' className={style.link + ' text-center'}>DISQUE-TROTE</Link>
          <Link to='/contato' className={style.link + ' text-left'}>CONTATO</Link>
        </div>
      </div>
      <div className={style.label}>{label}</div>
    </header>
  </>)
}

export default Header
