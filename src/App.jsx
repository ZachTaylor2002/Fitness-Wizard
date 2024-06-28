import { useState } from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import { generateWorkout } from './utils/function.js'

//In React.js we can render out sub-components within the parent component
function App() {
  const [workout, setWorkout] = useState(null)
  const [poison, setPoison] = useState(null)
  const [muscles, setMuscles] = useState([])
  const [goal, setGoal] = useState(null)

  
  function updateWorkout() {
    if (muscles.length < 1) {
      return
    }
    let newWorkout = generateWorkout({ poison, muscles, goal })
    setWorkout(newWorkout)

    window.location.href = '#workout'
  }


  return (
    //React Fragments
    //Basically empty divs 
    //From here we can render out our React components as if they were HTML tags
    


    <main className= 'min-h-screen flex flex-col bg-gradient-to-r from-blue-700 to-green-600 text-white text-sm sm:text-base'>

     <Hero/>
     <Generator
     poison={poison}
     setPoison={setPoison}
     muscles={muscles}
     setMuscles={setMuscles}
     goal={goal}
     setGoal={setGoal}
     updateWorkout={updateWorkout}
     />
     {workout && (<Workout  workout={workout} />)}
    </main>
  )
}

export default App
