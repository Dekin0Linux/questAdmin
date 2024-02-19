import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div className='flex gap-10 my-10'>
        <Link to={'/'} className='bg-blue-200 px-5 py-2 rounded'>Learners</Link>
        <Link to={'/payment'} className='bg-gray-200 px-5 py-2 rounded'>Payments</Link>
        <Link to={'/trainers'} className='bg-slate-200 px-5 py-2 rounded'>Trainers</Link>
    </div>
  )
}

export default Nav