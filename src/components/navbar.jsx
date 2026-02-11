import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Logo from '../images/logo-icmc-preto.svg';

/**
 * Navbar
 *
 * @return {void}
 */
function Navbar() {
  const links = [{
    path: '/',
    text: 'página inicial',
    id: 'home',
  }, {
    path: '/#programacao',
    text: 'programação',
    id: 'programacao',
  }, {
    path: '/#servicos',
    text: 'serviços',
    id: 'servicos',
  }, {
    path: '/disque-trote',
    text: 'disque-trote',
  }, {
    path: '/contato',
    text: 'contato',
  }];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  // Monitora a rolagem para atualizar o link ativo na navbar
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const headerOffset = 100;
      const scrollPosition = window.scrollY + headerOffset;

      if (scrollPosition < 300) {
        setActiveSection('home');
        return;
      }

      // Verifica seções
      links.forEach((link) => {
        if (link.id) {
          const element = document.getElementById(link.id);
          if (element) {
            if (scrollPosition >= element.offsetTop) {
              setActiveSection(link.id);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Verifica se o link deve ser marcado como ativo
  const checkActive = (link) => {
    // Para páginas externas (contato, disque-trote)
    if (link.path && !link.path.includes('#') && link.path !== '/') {
      return location.pathname === link.path;
    }

    // Para Home e seções
    if (location.pathname === '/') {
      if (link.path === '/') {
        return activeSection === 'home' || (activeSection === '' && location.hash === '');
      }
      if (link.id && activeSection === link.id) return true;
    }
    return false;
  };

  // O que acontece ao clicar em um link da navbar
  const handleClick = (link) => {
    setIsDrawerOpen(false);

    if (link.path === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeClass = 'text-yellow-600';
  const inactiveClass = 'color-black';

  return (<>
    <header className='bg-white color-black shadow h-20 fixed top-0 left-0 right-0 z-10'>
      <div className='flex h-full items-center justify-between container mx-auto px-4'>
        <div className='flex items-center h-full'>
          <a className='h-full' href='https://www.icmc.usp.br/'>
            <img src={Logo} alt='Logo ICMC 50 anos' className='p-2 h-full' id="imgnav" />
          </a>
        </div>
        <div className='hidden lg:flex'>
          {links.map((link, index) => {
            const isActive = checkActive(link);
            return (
              <HashLink smooth key={index} to={link.path} onClick={() => handleClick(link)} className={`p-4 transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}>
                <b>{link.text}</b>
              </HashLink>
            );
          })}
        </div>
        <div className='lg:hidden'>
          <IconButton aria-label='Abrir menu' onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>
      <SwipeableDrawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        slotProps={{ paper: { style: { backgroundColor: '#fafafa' } } }}
      >
        <div
          className='flex flex-col items-center pt-4'
          style={{ minWidth: '260px' }}
        >
          {links.map((link, index) => {
            const isActive = checkActive(link);
            return (
              <HashLink smooth key={index} to={link.path} onClick={() => handleClick(link)} className={`p-4 transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}>
                <b>{link.text}</b>
              </HashLink>
            );
          })}
        </div>
      </SwipeableDrawer>
    </header>
  </>);
}

export default Navbar;
