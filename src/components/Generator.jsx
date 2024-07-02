import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { SCHEMES, WORKOUTS } from '../utils/workout_info';
import Button from './Button';

// Header Component
function Header(props) {
  const { index, title, description } = props;  // Destructure props to get index, title, and description
  
  return (
    <div className='flex flex-col gap-4 text-white'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-500'>{index}</p>
        <h4 className='text-2xl sm:text-3xl md:text-4xl'>{title}</h4>
      </div>
      <p className='text-base sm:text-lg mx-auto'>{description}</p>
    </div>
  );
}

// Generator Component
export default function Generator(props) {
  const [showModal, setShowModal] = useState(false);  // State to track modal visibility
  const { muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout } = props;  // Destructure props to get state and update functions

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to update selected muscles
  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter(val => val !== muscleGroup));  // Remove muscle group if already selected
      return;
    }

    if (muscles.length > 2) {
      return;  // Limit to 3 muscle groups
    }

    if (poison !== 'individual') {
      setMuscles([muscleGroup]);  // If not individual, set the single muscle group
      setShowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);  // Add muscle group to the list
    if (muscles.length === 2) {
      setShowModal(false);  // Close modal after selecting 3 muscle groups
    }
  }

  return (
    <SectionWrapper id={'generate'} header={'generate your workout'} title={['It\'s', 'Fitness', 'o\'clock']}>
      <Header index={'01'} title={'Pick your challenge'} description={'Choose your next fitness adventure.'} />

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {Object.keys(WORKOUTS).map((type, typeIndex) => (
          <button
            key={typeIndex}
            onClick={() => {
              setMuscles([]);
              setPoison(type);
            }}
            className={
              'border duration-200 px-4 py-3 rounded-lg' +
              (type === poison
                ? ' bg-orange-500 border-orange-500 text-white'
                : ' bg-slate-950 border-slate-950 text-white hover:border-orange-500 hover:bg-orange-500')
            }
          >
            <p className='capitalize'>{type.replaceAll('_', ' ')}</p>
          </button>
        ))}
      </div>

      {poison && (
        <>
          <Header index={'02'} title={'Lock on targets'} description={'Target your muscle groups'} />
          <div className='bg-slate-950 p-3 border border-solid border-blue-400 rounded-lg'>
            <button onClick={toggleModal} className='relative flex items-center justify-between w-full p-3'>
              <p className='capitalize text-center w-full'>{muscles.length === 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
              <i className='fa-solid fas fa-caret-down text-white'></i>
            </button>
            {showModal && (
              <div className='flex flex-col px-3 pb-3'>
                {poison === 'individual' ? (
                  WORKOUTS[poison].map((muscleGroup, muscleGroupIndex) => (
                    <button
                      key={muscleGroupIndex}
                      onClick={() => {
                        updateMuscles(muscleGroup);
                      }}
                      className={'hover:text-orange-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-orange-400' : ' ')}
                    >
                      <p className='uppercase'>{muscleGroup.replaceAll('_', ' ')}</p>
                    </button>
                  ))
                ) : (
                  Object.keys(WORKOUTS[poison]).map((muscleGroup, muscleGroupIndex) => (
                    <button
                      key={muscleGroupIndex}
                      onClick={() => {
                        updateMuscles(muscleGroup);
                      }}
                      className={'hover:text-orange-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-orange-400' : ' ')}
                    >
                      <p className='uppercase'>{muscleGroup.replaceAll('_', ' ')}</p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </>
      )}

      <Header index={'03'} title={'Define Your Mission'} description={'Select your ultimate objective.'} />

      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg'>
          {Object.keys(SCHEMES).map((scheme, schemeIndex) => (
            <button
              key={schemeIndex}
              onClick={() => setGoal(scheme)}
              className={`border duration-200 px-4 py-3 rounded-lg ${
                goal === scheme ? ' bg-orange-500 border-orange-500 text-white' : ' bg-slate-950 border-slate-950 text-white hover:border-orange-500 hover:bg-orange-500'
              }`}
            >
              <p className='capitalize'>{scheme.replace(/_/g, ' ')}</p>
            </button>
          ))}
        </div>
      </div>

      <Button func={updateWorkout} text={'Formulate'} />
    </SectionWrapper>
  );
}
