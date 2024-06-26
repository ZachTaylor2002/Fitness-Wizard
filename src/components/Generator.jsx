import React, {useState} from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/workout_info';

function Header(props) {
  const { index, title, description } = props;
  
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

export default function Generator() {
  const [showModal, setShowModal] = useState(false);
  const [workout, setWorkout] = useState(null)
  const [poison, setPoison] = useState(null)
  const [muscles, setMuscles] = useState([])
  const [goal, setGoal] = useState(null)

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
        setMuscles(muscles.filter(val => val !== muscleGroup))
        return
    }

    if (muscles.length > 2) {
        return
    }

    if (poison !== 'individual') {
        setMuscles([muscleGroup])
        setShowModal(false)
        return
    }

    setMuscles([...muscles, muscleGroup])
    if (muscles.length === 2) {
        setShowModal(false)
    }

}

  return (
    <SectionWrapper header={"generate your workout"} title={['It\'s', 'Fitness', 'o\'clock']}>
      <Header index={'01'} title={'Pick your challenge'} description={"Choose your next fitness adventure."} />
      
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
      {Object.keys(WORKOUTS).map((type, typeIndex) => {
        return (
          <button onClick={() => {
            setMuscles([])
            setPoison(type)
          }} className={
            'border duration-200 px-4 py-3 rounded-lg' +
            (type === poison ? ' bg-orange-500 border-orange-500 text-white' : ' bg-slate-950 border-slate-950 text-white hover:border-orange-500 hover:bg-orange-500')
          } key={typeIndex}>
             <p className='capitalize'>{type.replaceAll('_', " ")}</p>
          </button>
        )
      })}
      </div>

      
      <Header index={'02'} title={'Lock on targets'} description={"Target your muscle groups"} />
      <div className='bg-slate-950 p-3 border border-solid border-blue-400 rounded-lg'>
      <button onClick={toggleModal} className='relative flex items-center justify-between w-full p-3'>
            <p className='capitalize text-center w-full'>{muscles.length == 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
          <i className="fa-solid fas fa-caret-down text-white"></i>
      </button>
        {showModal && (
            <div className='flex flex-col px-3 pb-3'>
            {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
                return (
                    <button onClick={() => {
                        updateMuscles(muscleGroup)
                    }} key={muscleGroupIndex} className={'hover:text-orange-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-orange-400' : ' ')}>
                        <p className='uppercase'>{muscleGroup.replaceAll('_', ' ')}</p>
                    </button>
                )
            })}
        </div>
        )}
      </div>

      <Header index={'03'} title={'Define Your Mission'} description={"Select your ultimate objective."} />
      
      <div className='flex justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg'>
  {Object.keys(SCHEMES).map((scheme, schemeIndex) => (
    <button
      key={schemeIndex}
      onClick={() => setGoal(scheme)} 
      className={`border duration-200 px-4 py-3 rounded-lg ${goal === scheme ? ' bg-orange-500 border-orange-500 text-white' : ' bg-slate-950 border-slate-950 text-white hover:border-orange-500 hover:bg-orange-500'}`}
    >
      <p className='capitalize'>{scheme.replace(/_/g, ' ')}</p> {/* Use replace with regex for older browser compatibility */}
    </button>
  ))}
</div>
</div>

    </SectionWrapper>
  )
}