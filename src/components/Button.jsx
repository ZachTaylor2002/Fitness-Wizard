import React from 'react'

//Defining a Button component that receives props.
export default function Button(props) {

   // Destructure the text and func properties from props.
    const { text, func } = props

  return (
    // Render a button element.
    // Set the onClick handler to the func passed in through props.
    // Applying various Tailwind CSS classes for styling.
    <button onClick={func} className='px-8 mx-auto py-4 rounded-md border-2 border-orange-400 bg-slate-950 text-white shadow-blue duration-200'>
      
    {/* Render the text passed in through props inside a paragraph element. */}
        <p>{text}</p>
        </button>
  )
}
