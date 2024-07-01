//Importing the React libaray for the jsx file and for creating React Components.
import React from 'react';

//Importing the SectionWrapper component to wrap the workout section
import SectionWrapper from './SectionWrapper.jsx';

//Importing the ExerciseCard component to display personalized exercise selected
import ExerciseCard from './ExerciseCard.jsx';

//Creating the workout component that takes props as an argument
export default function Workout(props) {

  //Here we are destructuring the workout array from props.
  const { workout } = props;

  //Returning the JavaScript and HTML code component section back in the SectionWrapper component.

  //Providing the id (used for page bookmarking), header, and title props to the component
  return (
    <SectionWrapper id={'workout'} header={'Ready to Crush it?'} title={['Your', 'Workout', 'Awaits']}>
      <div className='flex flex-col gap-4'>
        {workout.map((exercise, i) => (
          <ExerciseCard i={i} exercise={exercise} key={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}

//Inside of the component, I first created a flex container with colum direction and a gap between the items. Then after that I decided to then create another section where I would be mapping over the workout array to render out each exercise in the ExerciseCard Component. 

//I would be passing in the the exercise and index of i as props to ExerciseCard.
//Overall using the index i as the key for each ExerciseCard component.
