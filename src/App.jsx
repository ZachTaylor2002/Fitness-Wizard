// Importing the useState hook from React for managing state within the component
import { useState } from 'react'

//Importing the Hero component
import Hero from './components/Hero'

//Importing the Generator component
import Generator from './components/Generator'

//Importing the Workout component
import Workout from './components/Workout'

//Importing the generateWorkout function from the utils folder
import { generateWorkout } from './utils/function.js'

//Declaring the main App component. 
function App() {

  //Declaring the state variables using the useState hooks.
  //workout: holds the generated workout.
  const [workout, setWorkout] = useState(null)

  //poison: holds the selected workout type or category
  const [poison, setPoison] = useState(null)

  //muscles: holds an array of selected muscle groups
  const [muscles, setMuscles] = useState([])

  //goal: holds the selected fitness goal
  const [goal, setGoal] = useState(null)

  //Created a Function to update the workout based om the selected poison, muscles, and goal
  function updateWorkout() {
    //If no muscles are selected, do nothing.
    if (muscles.length < 1) {
      return
    }
    //Generate a new workout using the generateWorkout function.
    let newWorkout = generateWorkout({ poison, muscles, goal })

    //Updated the workout state with the new workout.
    setWorkout(newWorkout)

    //Scroll to the workout section by changing the window location hash.
    window.location.href = '#workout'
  }


  return (

    //Added tailwind CSS for styling.
    <main className= 'min-h-screen flex flex-col bg-gradient-to-r from-blue-700 to-green-600 text-white text-sm sm:text-base'>

      {/* Rendering the Hero component. */}
     <Hero/>

      {/* Rendering the Generator component and passing state and update function as props. */}
     <Generator
     poison={poison}
     setPoison={setPoison}
     muscles={muscles}
     setMuscles={setMuscles}
     goal={goal}
     setGoal={setGoal}
     updateWorkout={updateWorkout}
     />
     
     {/* Conditionally rendering the Workout component if a workout is generated. */}
     {workout && (<Workout  workout={workout} />)}
    </main>
  )
}

//Exporting the App component as the default export
export default App
