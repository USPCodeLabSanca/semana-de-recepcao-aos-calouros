import React from 'react'

import { Box, CardContent } from '@material-ui/core'

import AccessTimeIcon from '@material-ui/icons/AccessTime'
import RoomIcon from '@material-ui/icons/Room'

import Evento1 from '../images/evento1.jpg'

const style = {
    card: 'rounded-lg shadow w-custom mx-4 sm:mx-8 my-6',
    card_content: 'bg-white pt-4 pb-2 rounded-b-lg',
    card_row: 'flex flex-wrap items-center justify-center sm:py-12',
    event_info_box: 'flex mb-2',
    event_description: 'ml-1 lg:ml-3 text-gray-600',
    event_title: 'text-lg text-purple-800 font-medium mb-3',
    icon: 'text-gray-600',
    image: 'w-full h-56 sm:h-64 rounded-t-lg',
    main_box:'py-8 mb-24 event-card-bg'
}

export default function Eventos() {
    return (
        <Box className={style.main_box}>
            <Box className={style.card_row}>
                <Box className={style.card}>
                    <img src={Evento1} alt="Abertura oficial" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}> Abertura oficial </h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>Data e hora</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Local</p>
                        </Box>
                    </CardContent>
                </Box>
                <Box className={style.card}>
                    <img src={Evento1} alt="Boas-vindas" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}> Boas-vindas </h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>Data e hora</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Local</p>
                        </Box>
                    </CardContent>
                </Box>
                <Box className={style.card}>
                    <img src={Evento1} alt="Bate-papo com os coordenadores" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}> Bate-papo com os coordenadores </h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>Data e hora</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Local</p>
                        </Box>
                    </CardContent>
                </Box>
            </Box>

            <Box className={style.card_row}>
                <Box className={style.card}>
                    <img src={Evento1} alt="Feira de oportunidades" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}> Feira de oportunidades </h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>Data e hora</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Local</p>
                        </Box>
                    </CardContent>
                </Box>
                <Box className={style.card}>
                    <img src={Evento1} alt="Game Night" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}> Game Night </h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>Data e hora</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Local</p>
                        </Box>
                    </CardContent>
                </Box>
                <Box className={style.card}>
                    <img src={Evento1} alt="Seminário de Coisas Legais" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}> Seminário de Coisas Legais </h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>Data e hora</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Local</p>
                        </Box>
                    </CardContent>
                </Box>
            </Box>
        </Box>
    )   
}