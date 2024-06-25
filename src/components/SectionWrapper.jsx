import React from 'react';

export default function SectionWrapper(props) {
    // Destructure props to extract children, header, and title
    const { children, header, title } = props;

    return (
        <section className='min-h-screen flex flex-col bg-gradient-to-r from-blue-700 to-green-600 text-white'>
            <div className='bg-blue-900 py-10 flex flex-col items-center justify-center p-4 gap-2'>
                <p className='uppercase font-medium'>{header}</p>
                <h2 className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                    {title[0]} <span className='uppercase text-green-400'>{title[1]}</span> {title[2]}
                </h2>
            </div>
            <div className='max-w-[800px] w-full mx-auto flex flex-col gap-10 p-4'>
                {children}
            </div>
        </section>
    );
}
