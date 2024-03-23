import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'



import { Landing } from './components/Landing'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'

function App() {

  return (
    <>
    
     
     
     <BrowserRouter>
     
    <Routes>

     <Route path='/' element={<Landing />} />
     <Route path='/login' element={<Login />} />
     <Route path='/dashboard' element={ <Dashboard/>} />
     


    </Routes>
    
    </BrowserRouter>
    
    </>
  )
}

export default App
