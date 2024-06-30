import React from 'react'
import Button from './Button'

//First React Component created called Hero
//This component has the same name as the file (as well as the function) 

export default function Hero() {
    return (
        <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4'>
        <div className='flex flex-col gap-4'>
          <p className='text-lg sm:text-xl font-medium'>UNLEASH YOUR INNER</p>
          <h1 className='uppercase font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
            Fitness<span className='text-green-400'>Wizard</span>
          </h1>
        </div>
        <p className='text-sm md:text-base font-light'>
          Embark on a journey to become <span className='text-green-400 font-medium'>unbelievably fit</span> and transform into the local <span className='text-green-400 font-medium'>fitness legend</span>. Embrace the magic of every workout and unlock your full potential.
        </p>
        <Button func={() => {
                window.location.href = '#generate'
            }} text={"Accept & Begin"}></Button>
      </div>
    )
}
