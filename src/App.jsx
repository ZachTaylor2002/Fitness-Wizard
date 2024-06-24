import { useState } from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'

//In React.js we can render out sub-components within the parent component
function App() {
  

  return (
    //React Fragments
    //Basically empty divs 
    //From here we can render out our React components as if they were HTML tags
    <>
     <Hero/>
     <Generator/>
     <Workout/>
    </>
  )
}

export default App
