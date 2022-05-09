import React, { useState } from 'react'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'
import Tabs from 'react-bootstrap/Tabs'
import { Tab } from 'react-bootstrap'
import Navbox from '../../components/Navbox/Navbox'
import './LoginSignup.css'

function LoginSignup() {

  const [key, setKey] = useState('login');
  return (
    <>
      <Navbox />
      <div className="login-nav-container">
        <Tabs defaultActiveKey={key} id="uncontrolled-tab-example" className="mb-3" onSelect={(k) => setKey(k)}>
          <Tab eventKey="login" title="Login">
            <Login />
          </Tab>
          <Tab eventKey="Register" title="Register">
            <Signup />
          </Tab>
        </Tabs>
      </div>
      
    </>
  )
}

export default LoginSignup