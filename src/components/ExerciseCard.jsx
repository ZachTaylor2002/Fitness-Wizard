import React, { useState } from 'react';
import { FaDumbbell } from 'react-icons/fa';  // Importing an icon

export default function ExerciseCard(props) {
  const { exercise, i } = props;
  const [setsCompleted, setSetsComplete] = useState(0);

  function handleSetIncrement() {
    setSetsComplete((setsCompleted + 1) % 6);
  }

  return (
    <div className='p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-wrap transition-transform duration-300 hover:scale-105'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4'>
        <h4 className='text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-orange-500'>
          0{i + 1}
        </h4>
        <h2 className='capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 sm:text-center'>
          {exercise.name.replaceAll('_', ' ')}
        </h2>
        <p className='text-sm text-slate-400 capitalize'>{exercise.type}</p>
      </div>
      <div className='flex flex-col'>
        <h3 className='text-slate-400 text-sm flex items-center gap-2'>
          <FaDumbbell className='text-orange-500' /> Muscle Groups
        </h3>
        <p className='capitalize'>{exercise.muscles.join(' & ')}</p>
      </div>
      <div className='flex flex-col bg-slate-800 rounded p-2 gap-2'>
        {exercise.description.split('___').map((val, index) => (
          <div key={index} className='text-sm text-slate-300'>
            {val}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-4 sm:place-items-center gap-2'>
        {['reps', 'rest', 'tempo'].map((info) => (
          <div key={info} className='flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-700 w-full'>
            <h3 className='capitalize text-slate-400 text-sm'>
              {info === 'reps' ? `${exercise.unit}` : info}
            </h3>
            <p className='font-medium text-slate-200'>{exercise[info]}</p>
          </div>
        ))}
        <button
          onClick={handleSetIncrement}
          className='flex flex-col p-2 rounded border-[1.5px] duration-200 border-solid border-orange-900 hover:border-orange-600 w-full'>
          <h3 className='text-slate-400 text-sm capitalize'>Sets completed</h3>
          <p className='font-medium text-slate-200'>{setsCompleted} / 5</p>
          <div className='w-full bg-slate-800 h-2 rounded mt-2'>
            <div
              className='h-full rounded bg-orange-500'
              style={{ width: `${(setsCompleted / 5) * 100}%` }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
