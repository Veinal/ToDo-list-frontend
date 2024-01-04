import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import Register from './Register'
import LandingPage from './LandingPage'
import TodoModal from './TodoModal'
import Login from './Login'
import Aboutus from './Aboutus'
import Sidebar from './Sidebar'
import Archived from './Archived'
import Starred from './Starred'
import Deleted from './Deleted'
import Notes from './Notes'

const WithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default function Router() {
  
  return (
    <div>
      <BrowserRouter>
          {/* <Navbar /> */}
        <Routes>
          <Route exact path='/' element={<WithNavbar><LandingPage /></WithNavbar>} />
          <Route exact path='/aboutus' element={<WithNavbar><Aboutus /></WithNavbar>} />
          <Route exact path='/notes' element={<WithNavbar><Notes /></WithNavbar>} />
          <Route exact path='/archived' element={<WithNavbar><Archived /></WithNavbar>} />
          <Route exact path='/starred' element={<WithNavbar><Starred /></WithNavbar>} />
          <Route exact path='/deleted' element={<WithNavbar><Deleted /></WithNavbar>} />
          <Route exact path='/footer' element={<Footer />} />
          <Route exact path='/navbar' element={<Navbar />} />
          <Route exact path='/todomodal' element={<TodoModal />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/sidebar' element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
