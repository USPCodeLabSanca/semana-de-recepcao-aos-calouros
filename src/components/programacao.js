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
  schedule_text_box: 'flex flex-col justify-center py-2 px-3 w-full',
  schedule_title: 'color-black',
  schedule_description: 'color-dark-gray',
  schedule_place: 'color-dark-gray',
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
      {
        id: 0,
        timeBegin: '08:00',
        timeEnd: '10:00',
        title: 'Abertura conjunta',
        description: 'Atividade para todos os ingressantes do Campus USP São Carlos e seus familiares, com as presenças de dirigentes',
        place: 'Salão de eventos do Campus',
        type: '1'
      },
      {
        id: 1,
        timeBegin: '10:00',
        timeEnd: '12:00',
        title: 'Bate-papo com os pais, professores e coordenadores de curso',
        description: 'O evento ocorrerá em paralelo a atividades do Centro Acadêmico com os alunos',
        place: 'Auditório Fernão Stella',
        type: '2'
      },
      {
        id: 2,
        timeBegin: '18:00',
        timeEnd: '20:00',
        title: 'Recepção do ICMC',
        description: 'Boas-vindas: agora você faz parte do ICMC',
        place: 'Auditório Fernão Stella',
        type: '2'
      },
    ]
  },
  {
    id: 1,
    events: [
      {
        id: 0,
        timeBegin: '08:00',
        timeEnd: '10:00',
        title: 'Matrícula presencial',
        description: 'Cursos da área de Matemática (Núcleo Geral e Matemática Aplicada e Computação Científica) e do curso de Ciências de Computação',
        place: 'Anfiteatro Jorge Caron',
        type: '1'
      },
      {
        id: 1,
        timeBegin: '08:00',
        timeEnd: '10:00',
        title: 'Bate-papo com a coordenação',
        description: 'Curso de Engenharia de Computação',
        place: 'Bloco 4 do ICMC (sala 4-001)',
        type: '2'
      },
      {
        id: 2,
        timeBegin: '10:00',
        timeEnd: '12:00',
        title: 'Matrícula presencial',
        description: 'Curso de Engenharia de Computação',
        place: 'Anfiteatro Jorge Caron',
        type: '1'
      },
      {
        id: 3,
        timeBegin: '10:00',
        timeEnd: '12:00',
        title: 'Bate-papo com a coordenação',
        description: 'Curso de Ciências de Computação',
        place: 'Bloco 4 do ICMC (sala 4-003)',
        type: '2'
      },
      {
        id: 4,
        timeBegin: '10:00',
        timeEnd: '12:00',
        title: 'Bate-papo com a coordenação',
        description: 'Cursos de Matemática (Núcleo Geral e Matemática Aplicada e Computação Científica)',
        place: 'Bloco 4 do ICMC (sala 4-001)',
        type: '2'
      },
      {
        id: 5,
        timeBegin: '18:00',
        timeEnd: '19:00',
        title: 'Bate-papo com a coordenação',
        description: 'Curso de Estatística e Ciência de Dados',
        place: 'Bloco 4 do ICMC (sala 4-003)',
        type: '2'
      },
      {
        id: 6,
        timeBegin: '18:00',
        timeEnd: '19:00',
        title: 'Bate-papo com a coordenação',
        description: 'Curso de Sistemas de Informação',
        place: 'Bloco 4 do ICMC (sala 4-005)',
        type: '2'
      },
      {
        id: 7,
        timeBegin: '19:00',
        timeEnd: '21:00',
        title: 'Matrícula presencial',
        description: 'Cursos de Estatística e Ciência de Dados e Sistemas de Informação',
        place: 'Anfiteatro Jorge Caron',
        type: '1'
      }
    ]
  },
  {
    id: 2,
    events: [
      {
        id: 0,
        timeBegin: '08:00',
        timeEnd: '10:00',
        title: 'Matrícula presencial',
        description: 'Cursos da área de Matemática (Núcleo Geral e Matemática Aplicada e Computação Científica) e do curso de Ciências de Computação',
        place: 'Anfiteatro Jorge Caron',
        type: '1'
      },
      {
        id: 1,
        timeBegin: '09:00',
        timeEnd: '12:00',
        title: 'Feira de oportunidades',
        description: 'Conheça as diversas oportunidades oferecidas aos alunos de graduação e saiba mais sobre os grupos de extensão',
        place: 'Hiperespaço Gilberto Loibel',
        type: '2'
      },
      {
        id: 2,
        timeBegin: '10:00',
        timeEnd: '12:00',
        title: 'Matrícula presencial',
        description: 'Curso de Engenharia de Computação',
        place: 'Anfiteatro Jorge Caron',
        type: '1'
      },
      {
        id: 3,
        timeBegin: '18:00',
        timeEnd: '21:00',
        title: 'Aulas introdutórias',
        description: 'As primeiras aulas no ICMC a gente nunca esquece: assista a três aulas introdutórias sobre computação, matemática e estatística',
        place: 'Auditório Fernão Stella',
        type: '2'
      },
      {
        id: 4,
        timeBegin: '19:00',
        timeEnd: '21:00',
        title: 'Matrícula presencial',
        description: 'Cursos de Estatística e Ciência de Dados e Sistemas de Informação',
        place: 'Anfiteatro Jorge Caron',
        type: '1'
      },
      {
        id: 5,
        timeBegin: '21:00',
        timeEnd: '00:00',
        title: 'Luau e Gincana',
        description: 'Faça parte dessa diversão',
        place: 'Jardim secreto do ICMC',
        type: '2'
      }
    ]
  },
  {
    id: 3,
    events: [
      {
        id: 0,
        timeBegin: '09:00',
        timeEnd: '11:00',
        title: 'Bate-papo com alunos experientes',
        description: 'Aprenda com quem já foi calouro',
        place: 'Auditório Fernão Stella',
        type: '2'
      },
      {
        id: 1,
        timeBegin: '11:00',
        timeEnd: '12:00',
        title: 'Bate-papo',
        description: 'Ufa, passei! E agora? Promovendo a saúde mental na Universidade',
        place: 'Auditório Fernão Stella',
        type: '2'
      },
      {
        id: 2,
        timeBegin: '12:00',
        timeEnd: '19:00',
        title: 'Trote solidário / Ambiental',
        place: 'Local a ser definido',
        type: '2'
      },
      {
        id: 3,
        timeBegin: '19:00',
        timeEnd: '00:00',
        title: 'Game Night',
        description: 'Sua primeira noite de jogos no ICMC',
        place: 'Jardim secreto do ICMC',
        type: '2'
      }
    ]
  },
  {
    id: 4,
    events: [
      {
        id: 0,
        timeBegin: '11:11',
        timeEnd: '12:00',
        title: 'Seminário de Coisas Legais',
        place: 'Auditório Fernão Stella',
        type: '2'
      },
      {
        id: 1,
        timeBegin: '12:00',
        timeEnd: '13:00',
        title: 'Encerramento',
        description: 'Premiação para os alunos que conquistaram mais pontos no jogo Bixoquest',
        place: 'Auditório Fernão Stella',
        type: '2'
      }
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
          <Box className={style.schedule_text_box}>
            <Typography className={style.schedule_title} variant="body1">{current.title}</Typography>
            <br/>
            {
              current.description &&
              <>
                <Typography className={style.schedule_description} variant="body2">{current.description}</Typography>
                <br/>
              </>
            }
            <Typography className={style.schedule_place} variant="caption">{current.place}</Typography>
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