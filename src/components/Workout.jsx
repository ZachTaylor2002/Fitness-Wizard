import React from 'react'
import SectionWrapper from './SectionWrapper.jsx'
import ExerciseCard from './ExerciseCard.jsx'

export default function Workout(props) {
  const { workout } = props
  return (
    <SectionWrapper header={"Ready to Crush it?"} title={['Your', 'Workout', 'Awaits']}>
        <div className='flex flex-col gap-4'>
        {workout.map((exercise, i) => {
                    return (
                        <ExerciseCard i={i} exercise={exercise} key={i} />
                    )
                })}

        </div>
        </SectionWrapper>
  )
}
