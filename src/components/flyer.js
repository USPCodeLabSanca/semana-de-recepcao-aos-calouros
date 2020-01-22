import React from 'react'
import { Box } from '@material-ui/core'

import LogoBixoquest from '../images/logo-bixoquest.png'

const style = {
    button: 'bg-orange-500 shadow py-3 px-12 text-white rounded font-medium',
    main_box: 'flex flex-col sm:flex-row justify-center my-12',
    logo:'w-3/4',
    logo_box:'flex justify-center',
    text: 'text-gray-600 mt-8 mb-10 px-2 md:px-0 text-lg',
    text_box: 'text-center md:text-left px-2',
    title: 'text-5xl text-gray-800 font-semibold'
}

export default function Flyer() {
    return (
        <Box className={style.main_box}>
            <Box className={style.logo_box}>
                <img src={LogoBixoquest} alt='Logo Bixoquest' className={style.logo}/>
            </Box>
            <Box className={style.text_box}>
                <h2 className={style.title}>A aventura vai começar!</h2>
                <p className={style.text}>
                    Já pensou transformar a Semana de Recepção em um grande jogo?!
                </p>
                <button className={style.button}>Clique aqui!</button>
            </Box>
        </Box>
    )   
}