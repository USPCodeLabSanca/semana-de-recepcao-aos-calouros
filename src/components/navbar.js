import React from 'react';

import {Link} from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Logo from '../images/logo.png';

/**
 * Navbar
 *
 * @return {void}
 */
function Navbar() {
  const links = [{
    path: '/programacao',
    text: 'programação',
  }, {
    path: '/disque-trote',
    text: 'disque-trote',
  }, {
    path: '/informacoes',
    text: 'informações',
  }, {
    path: '/contato',
    text: 'contato',
  }];

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (<>
    <header className='bg-black shadow h-20 fixed top-0 left-0 right-0 z-10'>
      <div className='flex h-full items-center justify-between container mx-auto px-4'>
        <Link className='h-full' to='/'>
          <img src={Logo} alt='Logo ICMC 50 anos' className='p-4 h-full'/>
        </Link>
        <div className='hidden lg:flex'>
          {links.map((link) => {
            return (<Link key={link.path} to={link.path} className='color-white p-4'><b>{link.text}</b></Link>);
          })}
        </div>
        <div className='lg:hidden'>
          <IconButton color='secondary' aria-label='Abrir menu' onClick={() =>setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>
      <SwipeableDrawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        PaperProps={{style: {backgroundColor: '#151515'}}}
      >
        <div
          className='flex flex-col items-center pt-4'
          style={{minWidth: '260px'}}
        >
          {links.map((link) => {
            return (<Link key={link.path} to={link.path} onClick={() => setIsDrawerOpen(false)} className='color-white p-4'><b>{link.text}</b></Link>);
          })}
        </div>
      </SwipeableDrawer>
    </header>
  </>);
}

export default Navbar;
