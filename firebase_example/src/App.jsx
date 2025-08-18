import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from './compo/Homepage';
import Addproduct from './compo/Addproduct';
import Login from './compo/login';


function App() {
  return (



    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/Addproduct" element={<Addproduct />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App