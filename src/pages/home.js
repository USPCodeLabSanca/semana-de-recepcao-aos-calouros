import React from 'react'

import Header from '../components/header'
import Countdown from '../components/countdown'
import Flyer from '../components/flyer'
import Programacao from '../components/programacao'
import LinksImportantes from '../components/links-importantes'
import Footer from '../components/footer'

export default function Home () {
  return (
    <div>
      <Header />
      <Countdown />
      <Flyer />
      <Programacao />
      <LinksImportantes />
      <Footer />
    </div>
  )
}
