import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

const style = {
  root: 'color-black shadow-sm',
  card: 'py-10 px-2 md:px-16',
  title: 'text-3xl font-bold',
}

export default function Contato () {
  return (<>
    <Header />
    <main className={style.root}>
      <div className={style.card}>
        <h1 className={style.title}>Serviço de Graduação</h1>
        <p>Bloco 3</p>
        <p>(16) 3373-9639</p>
        <p>grad@icmc.usp.br</p>
        <br/>
      </div>
      <iframe
        title='Mapa para bloco 3 - serviço de graduação'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2578.1624193079933!2d-47.896421983296484!3d-22.007266332805106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b877325a2f2381%3A0x7923e6d8ad682ad1!2sICMC%20-%20Instituto%20De%20Ci%C3%AAncias%20Matem%C3%A1ticas%20e%20de%20Computa%C3%A7%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1579794628095!5m2!1spt-BR!2sbr'
        width='100%'
        height='400px'
        frameBorder='0'
        allowFullScreen
        style={{border: 0}}>
      </iframe>

    </main>
    <Footer />
  </>)
}