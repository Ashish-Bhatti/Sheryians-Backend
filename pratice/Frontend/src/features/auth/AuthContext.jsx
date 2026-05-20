import React, { createContext, useState, useTransition } from 'react'
import {login, register} from '../auth/services/auth.api'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (username, password)=>{
    setLoading(true)

    try {
      const response = await login(username, password)
      setUser(response.user)
      console.log(user)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (username, email, password)=>{
    setLoading(true)

    try {
      const response = await register(username, email, password)
      setUser(response.user)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider