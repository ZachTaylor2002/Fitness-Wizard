//Programmer: Zachary Taylor
//Project: Fitness Wizard React application with JavaScript

//Importing the React libaray which is needed for using JSX and creating React components
import React from 'react'

//Importing the ReactDOM library for rendering React components to the DOM
import ReactDOM from 'react-dom/client'

//Importing the main App component from the ./App.jsx section
import App from './App.jsx'

//Importing the CSS styles to the main.jsx so that css can be applied.
import './index.css'

//Creating a root element to render the React component tree.
//The createRoot method is used to create a root Document Object for React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

//Inside of the React.StrictMode, we are rendering out the App component which is the main component of the Fitness Wizard Application