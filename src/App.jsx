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


    <main className= 'min-h-screen flex flex-col bg-gradient-to-r from-blue-700 to-green-600 text-white text-sm sm:text-base'>

     <Hero/>
     <Generator/>
     <Workout/>
    </main>
  )
}

export default App
