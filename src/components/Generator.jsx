import React from 'react'
import SectionWrapper from './SectionWrapper'
import { WORKOUTS } from '../utils/workout_info';

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

  return (
    <SectionWrapper  header={"generate your workout"} title={['It\'s', 'Fitness', 'o\'clock']}>
      <Header index={'01'} title={'Pick your challenge'} description={"Choose your next fitness adventure."} />
      
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
      {Object.keys(WORKOUTS).map((type, typeIndex) => {
        return (
          <button className='bg-slate-950 border border-slate-950 duration-200 px-4 py-3 rounded-lg hover:border-orange-500 hover:bg-orange-500 hover:text-white' key={typeIndex}>
             <p className='capitalize'>{type.replaceAll('_', " ")}</p>
          </button>
        )
      })}
      </div>

      
      <Header index={'02'} title={'Lock on targets'} description={"Target your muscle groups"} />
<div className='bg-slate-950 p-3 border border-solid border-blue-400 rounded-lg'>
   <div className='relative flex items-center justify-center'>
       <p className="text-white">Select muscle groups</p>
       <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fas fa-caret-down"></i>
   </div>

</div>
    
    

    </SectionWrapper>

    
  )
}
