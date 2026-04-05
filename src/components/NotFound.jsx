import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className=' flex justify-center items-center min-h-screen'>
        <div className=' flex flex-col items-center space-y-4'>
            <h1 className='font-bold text-3xl' >404</h1>
            <p className='text-xl text-gray-600' >Oops! Page Not Found</p>
            <Link to={'/'} className='text-blue-500 hover:text-blue-700'  >
            Return to home
            </Link>
        </div>
    </div>
  )
}

export default NotFound