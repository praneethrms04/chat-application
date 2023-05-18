import React, { useState } from 'react'
import Login from "../components/login/Login.jsx"
import Signup from '../components/signup/Signup.jsx'

const HomePage = () => {
  const [showSignup, setShowSignup] = useState(false)

  const gotoLogin= ()=>{
    setShowSignup(false)
  }

  const gotoSignup= ()=>{
    setShowSignup(true)
  }

  
  return (
    <>
      {
        showSignup ? (<Signup gotoLogin ={gotoLogin} />) : (<Login gotoSignup={gotoSignup} />)
      }
    </>
  )
}

export default HomePage