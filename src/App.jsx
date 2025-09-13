
import './App.css'
import Header from './assets/components/header'
import Home from './assets/components/home'
import Skillcard from './assets/components/skillcard'
import Profile from './assets/components/profile'
import AboutUs from './assets/components/aboutus'
import Login from './assets/components/Login'
import { SkillsProvider } from './assets/context/SkillsContext';
import { AuthProvider } from './assets/context/AuthContext'

import React from 'react';
import { useState } from 'react';


function App() {
   const [currentPage, setCurrentPage] = useState('Home');

  return (
    <>
    <AuthProvider>
    <SkillsProvider>
     
       <Header setCurrentPage={setCurrentPage} />
      {currentPage === 'Home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'Skills' && <Skillcard />}
      {currentPage === 'Profile' && <Profile />}
      {currentPage === 'AboutUs' && <AboutUs />}
     {currentPage === 'Login' && <Login onClose={() => setCurrentPage('Home')} onLoginSuccess={() => setCurrentPage('Home')} />}
      </SkillsProvider>
      </AuthProvider>
    </>
  )
}

export default App
