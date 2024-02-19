import React, { useState } from 'react'
import Learners from './components/Learners'
import Nav from './components/Nav'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Trainers from './components/Trainers'
import Payments from './components/Payments'

function App() {
  return (
    <div className='p-10'>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Learners/>} />
          <Route path='/trainers' element={<Trainers/>} />
          <Route path='/payment' element={<Payments/>}/>
        </Routes>
        

      </BrowserRouter>
      {/* <Learners/> */}
    </div>
  )
}

export default App