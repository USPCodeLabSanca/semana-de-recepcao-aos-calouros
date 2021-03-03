import React from 'react';

import {Box, Card} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import ClassIcon from '@material-ui/icons/Class';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import AddIcon from '@material-ui/icons/Add';

import {scheduleContent, steps, stepContent} from './programacao-data';

const style = {
  card: 'my-4 shadow-sm w-5/6 md:w-3/5',
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
  stepper: 'w-full sm:w-5/6 md:w-3/5 overflow-x-scroll sm:overflow-x-auto',
  stepper_box: 'flex justify-center',
  text: 'color-dark-gray text-2xl',
  text_box: 'text-center mb-8 px-2',
  time_box_1: 'bg-primary text-center w-1/4 sm:w-1/6 py-2',
  time_box_2: 'bg-secondary text-center w-1/4 sm:w-1/6 py-2',
  title: 'text-5xl color-dark-gray my-6 font-semibold',
};

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

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
    [theme.breakpoints.up('md')]: {
      width: 50,
      height: 50,
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
}));

/**
 * ColorlibStepIcon
 *
 * @param {object} props
 *
 * @return {void}
 */
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const {active} = props;

  const icons = {
    1: <PeopleIcon/>,
    2: <ChatIcon/>,
    3: <ClassIcon/>,
    4: <SportsEsportsIcon/>,
    5: <EmojiEmotionsIcon/>,
    6: <AddIcon/>,
    7: <AddIcon/>,
    8: <AddIcon/>,
    9: <AddIcon/>,
  };

  return (
    <div className={clsx(classes.root, {[classes.active]: active})}>
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.node,
};

/**
 * getScheduleContent
 *
 * @param {any} step
 *
 * @return {void}
 */
function getScheduleContent(step) {
  const content = [];
  let current = {};

  for (const index in scheduleContent[step].events) {
    current = scheduleContent[step].events[index];

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
        </Card>,
    );
  }

  return content;
}

/**
 * Programacao
 *
 * @return {void}
 */
export default function Programacao() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStep = (step) => () => {
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
              const [date, weekDay] = label.split(' ');
              return (
                <Step key={index}>
                  <StepButton onClick={handleStep(index)} style={{outline: 'none'}}>
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
  );
}
