import React from 'react'

const style = {
  root: 'py-10 px-2 md:px-16',
  title: 'text-3xl font-bold',
}

export default function Contato () {
  return (
    <main className={style.root}>
      <h1 className={style.title}>Serviço de Graduação</h1>
      <p>Bloco 4</p>
      <p>(16) 3373-9639</p>
      <p>grad@icmc.usp.br</p>
    </main>
    
  )
}
