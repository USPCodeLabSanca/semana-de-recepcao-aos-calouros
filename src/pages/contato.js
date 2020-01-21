import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const style = {
  root: 'py-10 px-2 md:px-16',
  title: 'text-3xl font-bold',
}

export function Contato () {
  return (
    <main className={style.root}>
      <h1 className={style.title}>Serviço de Graduação</h1>
      <p>Bloco 4</p>
      <p>(16) 3373-9639</p>
      <p>grad@icmc.usp.br</p>

      <Map
          google={window.google}
          zoom={17}
          initialCenter={{ lat: -22.0070347, lng: -47.8949323 }}
        />
    </main>
    
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY
})(Contato);