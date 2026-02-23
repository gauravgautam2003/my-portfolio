import React, { useEffect, useState } from 'react'

const CustomCursor = () => {

  const [ position, setPosition ] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
    }
  })

  return (
    <div className='pointer-events-none fixed left-0 right-0 z-[9999]' style={{ transform : `translate(${position.x - 40}px , ${position.y - 40}px)` }}>
      <div className='h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 to-gray-500 opacity-80 blur-2xl' />
    </div>
  )
}

export default CustomCursor