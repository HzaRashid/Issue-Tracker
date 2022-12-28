import React, { createContext, useState, useContext } from 'react'

// const data = require('../pages/routes.json')

const authContext = createContext();

export function AuthProvider({children}) {

  const [user, setUser] = useState(null);
  
  return <authContext.Provider value={{ user, setUser }}>{children}</authContext.Provider>
  
}

export const AuthContexts = () => useContext(authContext)
