import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-8'>
     <NavLink to="/" className="text-gray-700 font-medium hover:text-blue-600">
        Home
     </NavLink>
     <NavLink to="/pastes" className="text-gray-700 font-medium hover:text-blue-600">Pastes</NavLink>
    </div>
  )
}

export default Navbar
