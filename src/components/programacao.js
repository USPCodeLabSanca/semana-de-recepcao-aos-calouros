import React from 'react'

import { Box, Card } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import StepConnector from '@material-ui/core/StepConnector'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from '@material-ui/icons/Chat'
import ClassIcon from '@material-ui/icons/Class'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'

const style = {
  card: 'my-4 shadow-sm w-5/6 md:w-2/5',
  card_content: 'flex',
  main_box: 'min-h-screen',
  schedule: 'text-center color-primary semibold px-2',
  schedule_day: 'my-12',
  schedule_description: 'w-3/4 sm:w-5/6',
  schedule_description_box: 'flex flex-col justify-center py-2 px-3 w-full',
  schedule_events: 'flex flex-col items-center mb-6',
  schedule_time: 'color-white semibold',
  stepper: 'w-full sm:w-2/5',
  stepper_box: 'flex justify-center',
  text: 'color-dark-gray text-2xl',
  text_box: 'text-center mb-8 px-2',
  time_box_1: 'bg-primary text-center w-1/4 sm:w-1/6 py-2',
  time_box_2: 'bg-secondary text-center w-1/4 sm:w-1/6 py-2',
  title: 'text-5xl color-dark-gray my-6 font-semibold'
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        width: 40,
        height: 40
    },
    [theme.breakpoints.up('md')]: {
        width: 50,
        height: 50
    },
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#4c51bf',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
}))

const scheduleContent = [
  {
    id: 0,
    events: [
      {id: 0, timeBegin: '08:00', timeEnd: '09:00', description: 'Recepção conjunta', type: '1'},
      {id: 1, timeBegin: '10:00', timeEnd: '12:00', description: 'Bate-papo com os pais', type: '2'},
      {id: 2,timeBegin: '18:00', timeEnd: '20:00', description: 'Recepção do ICMC', type: '2'},
    ]
  },

  {
    id: 1,
    events: [
      {id: 0, timeBegin: '08:00', timeEnd: '10:00', description: 'Matrícula (Matemática, Ciências de Comp.)', type: '1'},
      {id: 1, timeBegin: '08:00', timeEnd: '10:00', description: 'Bate-papo com os coordenadores (Eng. Comp.)', type: '2'},
      {id: 2, timeBegin: '10:00', timeEnd: '12:00', description: 'Confirmação matrícula (Eng. Comp.)', type: '1'},
      {id: 3, timeBegin: '10:00', timeEnd: '12:00', description: 'Bate-papo com os coordenadores (Matemática, Ciências de Comp.)', type: '2'},
      {id: 4, timeBegin: '18:00', timeEnd: '19:00', description: 'Bate-papo com os coordenadores (Sist. Info., Estatística)', type: '2'},
      {id: 5, timeBegin: '19:00', timeEnd: '21:00', description: 'Matrícula (Sist. Info., Estatística)', type: '1'}
    ]
  },

  {
    id: 2,
    events: [
      {id: 0, timeBegin: '08:00', timeEnd: '10:00', description: 'Matrícula (Matemática, Ciências de Comp.)', type: '1'},
      {id: 1, timeBegin: '09:00', timeEnd: '12:00', description: 'Feira de oportunidades', type: '2'},
      {id: 2, timeBegin: '10:00', timeEnd: '12:00', description: 'Matrícula (Eng. Comp.)', type: '1'},
      {id: 3, timeBegin: '18:00', timeEnd: '19:00', description: 'Aula introdutória (Computação)', type: '2'},
      {id: 4, timeBegin: '19:00', timeEnd: '20:00', description: 'Aula introdutória (Matemática)', type: '2'},
      {id: 5, timeBegin: '19:00', timeEnd: '21:00', description: 'Matrícula (Sist. Info., Estatística)', type: '1'},
      {id: 6, timeBegin: '20:00', timeEnd: '21:00', description: 'Aula introdutória (Estatística)', type: '2'},
      {id: 7, timeBegin: '21:00', timeEnd: '23:00', description: 'Luau', type: '2'}
    ]
  },

  {
    id: 3,
    events: [
      {id: 0, timeBegin: '09:00', timeEnd: '11:00', description: 'Bate-papo com alunos experientes', type: '2'},
      {id: 1, timeBegin: '11:00', timeEnd: '12:00', description: 'Palestra sobre saúde mental', type: '2'},
      {id: 2, timeBegin: '12:00', timeEnd: '19:00', description: 'Trote solidário / Ambiental', type: '2'},
      {id: 3, timeBegin: '19:00', timeEnd: '23:00', description: 'Game Night', type: '2'}
    ]
  },

  {
    id: 4,
    events: [
      {id: 0, timeBegin: '11:11', timeEnd: '12:00', description: 'Seminário de Coisas Legais', type: '2'},
      {id: 1, timeBegin: '12:00', timeEnd: '13:00', description: 'Premiação / Encerramento', type: '2'}
    ]
  }
]

const steps = ['17/02 (Seg)', '18/02 (Ter)', '19/02 (Qua)', '20/02 (Qui)', '21/02 (Sex)']

const stepContent = ['17/02 - Segunda-feira', '18/02 - Terça-feira', '19/02 - Quarta-feira', '20/02 - Quinta-feira', '21/02 - Sexta-feira']

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles()
  const { active } = props;

  const icons = {
    1: <PeopleIcon/>,
    2: <ChatIcon/>,
    3: <ClassIcon/>,
    4: <SportsEsportsIcon/>,
    5: <EmojiEmotionsIcon/>,
  };

  return (
    <div className={clsx(classes.root, {[classes.active]: active})}>
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.node
};

function getScheduleContent(step) {
  let content = []
  let current = {}

  for(let index in scheduleContent[step].events) {
    current = scheduleContent[step].events[index]

    content.push(
      <Card className={style.card} key = {index} square variant='outlined'>
        <Box className={style.card_content}>
          <Box className={current.type === '1' ? style.time_box_1 : style.time_box_2}>
            <Typography className={style.schedule_time}>{current.timeBegin}</Typography>
            <Typography className={style.schedule_time}>{current.timeEnd}</Typography>
          </Box>
          <Box className={style.schedule_description_box}>
            <Box className={style.schedule_description}>
              <Typography>{current.description}</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    )
  }

  return content
}

export default function Programacao() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleStep = step => () => {
    setActiveStep(step);
  };

  return (
    <Box className={style.main_box}>
      <Box className={style.text_box}>
        <h2 className={style.title}>Programação completa!</h2>
        <Typography className={style.text}>
          Acesse a programação completa da Semana de Recepção aos Calouros
        </Typography>
      </Box>

      <Box className={style.stepper_box}>
        <Box className={style.stepper}>
          <Stepper alternativeLabel nonLinear activeStep={activeStep} connector={<ColorlibConnector/>}>
            {steps.map((label, index) => {
              const [date, weekDay] = label.split(' ')
              return (
                <Step key={index}>
                  <StepButton onClick={handleStep(index)} style={{ outline: 'none' }}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      <div>{date}</div>
                      <div>{weekDay}</div>
                    </StepLabel>
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Box>

      <Box className={style.schedule_day}>
        <Typography className={style.schedule} variant='h4'>{stepContent[activeStep]}</Typography>
      </Box>

      <Box className={style.schedule_events}>
        {getScheduleContent(activeStep)}
      </Box>
    </Box>
  )
}