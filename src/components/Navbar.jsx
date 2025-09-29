import React from 'react'


const Navbar = () => {

  return (
    <nav className="flex justify-between bg-gray-700 text-white py-4  ">
      <div className="logo flex justify-between">
        <img src="/logo-notes.webp" alt="logo" width={40} height={40} className='ml-6' />
        <span className="font-bold text-xl max-md:hidden  mt-2 text-cyan-500 ">Task</span>
      </div>
      <div className='text-white cursor-pointer bg-cyan-700  rounded-md flex  justify-between items-center ring-2 ring-white mr-6 px-2  hover:bg-cyan-800'>
        <a href="https://github.com/RSRAJPUT1815/Rohit-Portfolio" target='_blank' rel="noreferrer" className='flex items-center gap-2'>
          <img className=' w-6 ' src="/github.svg" alt="Github" />
          <span className='font-bold '>Github</span>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
