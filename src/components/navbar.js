import React from 'react';

import { HashLink } from 'react-router-hash-link';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Logo from '../images/logo-icmc-preto.svg';

/**
 * Navbar
 *
 * @return {void}
 */
function Navbar() {
  const links = [{
    //   path: '/#programacao',
    //   text: 'programação',
    // }, {
    path: '/#servicos',
    text: 'serviços',
  }, {
    path: '/disque-trote',
    text: 'disque-trote',
  }, {
    path: '/contato',
    text: 'contato',
  }];

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (<>
    <header className='bg-white color-black shadow h-20 fixed top-0 left-0 right-0 z-10'>
      <div className='flex h-full items-center justify-between container mx-auto px-4'>
        <div className='flex items-center h-full'>
          <HashLink className='h-full' to='/'>
            <img src={Logo} alt='Logo ICMC 50 anos' className='p-2 h-full' id="imgnav" />
          </HashLink>
        </div>
        <div className='hidden lg:flex'>
          {links.map((link, index) => {
            return (<HashLink smooth key={index} to={link.path} className='color-black p-4'><b>{link.text}</b></HashLink>);
          })}
        </div>
        <div className='lg:hidden'>
          <IconButton color='primary' aria-label='Abrir menu' onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>
      <SwipeableDrawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        PaperProps={{ style: { backgroundColor: '#fafafa' } }}
      >
        <div
          className='flex flex-col items-center pt-4'
          style={{ minWidth: '260px' }}
        >
          {links.map((link) => {
            return (<HashLink smooth key={link.path} to={link.path} onClick={() => setIsDrawerOpen(false)} className='color-black p-4'>
              <b>{link.text}</b>
            </HashLink>);
          })}
        </div>
      </SwipeableDrawer>
    </header>
  </>);
}

export default Navbar;
