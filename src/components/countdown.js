import React from 'react'

import Moment from 'moment'

const style = {
  root: 'ml-10 sm:ml-20 text-white sm:mt-10',
  smallText: 'ml-2 mr-4 font-bold',
  largeText: 'text-xl sm:text-3xl font-bold',
  timeContainer: 'flex items-end',
  countdownContainer: 'block sm:flex items-end'
}

const Small = ({ ...props }) => <p className={style.smallText} {...props} />

const Large = ({ ...props }) => <p className={style.largeText} {...props} />

const TimeContainer = ({ ...props }) => <div className={style.timeContainer} {...props} />

const targetDate = Moment('24/01/2020 - 00h 00m', 'DD/MM/YYYY - HH[h] mm[m]', true)

const calculateDiff = () => Moment.duration(Moment(targetDate).diff(Moment()))

function Countdown () {
  const [diff, setDiff] = React.useState(calculateDiff())

  React.useEffect(() => {
    const handler = setInterval(() => setDiff(calculateDiff), 100)
    return () => clearInterval(handler)
  })

  return (
    <div className={style.root}>
      <div className={style.countdownContainer}>
        <TimeContainer>
          <Large>{diff.days()}</Large><Small>dias</Small>
        </TimeContainer>
        <TimeContainer>
          <Large>{diff.hours()}</Large><Small>horas</Small>
        </TimeContainer>
        <TimeContainer>
          <Large>{diff.minutes()}</Large><Small>minutos</Small>
        </TimeContainer>
        <TimeContainer>
          <Large>{diff.seconds()}</Large><Small>segundos</Small>
        </TimeContainer>
      </div>
      <Large>Chega Mais!</Large>
      <Large>22ª Semana de Recepção aos Calouros</Large>
    </div>
  )
}

export default Countdown
