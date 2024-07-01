import React from 'react';

// SectionWrapper component to wrap sections with a consistent style.
export default function SectionWrapper(props) {
    // Destructure props to extract children, header, title, and id.
    const { children, header, title, id } = props;

    return (
        // Define a section element with a minimum height of the screen.
        // Use a flexbox layout with vertical alignment and a gradient background.
        <section id={id} className='min-h-screen flex flex-col bg-gradient-to-r from-blue-700 to-green-600 text-white'>

            {/* Inner div for the section header with a blue background and centered text. */}
            <div className='bg-blue-900 py-10 flex flex-col items-center justify-center p-4 gap-2'>

                 {/* Display the header in uppercase with a medium font weight. */}
                <p className='uppercase font-medium'>{header}</p>

                {/* Display the title with different font sizes for responsiveness. */}
                <h2 className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>

                    {/* Highlight the second word in the title with a different color. */}
                    {title[0]} <span className='uppercase text-green-400'>{title[1]}</span> {title[2]}
                </h2>
            </div>
             {/* Inner div to contain the children components with a maximum width and centered layout. */}
            <div className='max-w-[800px] w-full mx-auto flex flex-col gap-10 p-4'>
                
                {/* Render the children passed to the SectionWrapper. */}
                {children}
            </div>
        </section>
    );
}
