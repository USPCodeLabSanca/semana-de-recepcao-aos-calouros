import React from 'react'

import Header from '../components/header'
import Countdown from '../components/countdown'
import Eventos from '../components/eventos'
import Programacao from '../components/programacao'
import LinksImportantes from '../components/links-importantes'
import Footer from '../components/footer'

export default function Home () {
  return (
    <div>
      <Header />
      <Countdown />
      <Eventos />
      <Programacao />
      <LinksImportantes />
      <Footer />
    </div>
  )
}
