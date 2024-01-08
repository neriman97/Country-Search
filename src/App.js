import React from 'react'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Countrysearch from './Components/Countrysearch/Countrysearch'
import Countries from './Components/Countries/Countries'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Countrysearch/>}/>
        <Route path='/:id' element={<Countries/>}/>
      </Routes>
    </div>
  )
}

export default App
