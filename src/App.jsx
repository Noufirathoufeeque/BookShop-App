import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'

import Home from './Pages/Home'
import Header from './Components/Header'


function App() {
  
  return (
    <>
      
      <Header/>
        <Routes>
          
          <Route element={<Home/>} path='/'/>
          
        </Routes>
      <Footer/>
        
      
    </>
  )
}

export default App
