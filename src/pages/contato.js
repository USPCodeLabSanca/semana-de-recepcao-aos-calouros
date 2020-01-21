import React from 'react'

const style = {
  root: 'py-10 px-2 md:px-16',
  title: 'text-3xl font-bold',
  description: 'text-sm',
}

const Desc = ({ children }) => <p className={style.description}>{children}</p>

export default function Contato () {
  return (
    <div>
      <div className={style.root}>
        <h1 className={style.title}>Serviço de graduação</h1>
        <Desc>Bloco 4</Desc>
        <Desc>(16) 3373-9639</Desc>
        <Desc>grad@icmc.usp.br</Desc>
      </div>
      <iframe
        title='Mapa para o bloco 4 da Universidade de são paulo'
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1849.5534393623764!2d-47.895080598100954!3d-22.007215437622172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDAwJzI2LjAiUyA0N8KwNTMnMzkuOCJX!5e0!3m2!1sen!2sbr!4v1579644990361!5m2!1sen!2sbr"
        frameBorder="0"
        style={{ border: 0, height: '300px', width: '100%' }}
        allowFullScreen=""
      />
    </div>
  )
}
