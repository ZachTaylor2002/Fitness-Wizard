import React from 'react'
import SectionWrapper from './SectionWrapper'

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
    <SectionWrapper  header={"generate your workout"} title={['It\'s', 'Huge', 'o\'clock']}>
      <Header index={'01'} title={'Pick your challenge'} description={"Choose your next fitness adventure."} />
    

    </SectionWrapper>

    
  )
}
