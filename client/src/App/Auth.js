import React, { createContext, useState, useContext } from 'react'


const authContext = createContext();

export function AuthProvider({children}) {
  
  const TBDAuthUser = {
    authenticated: null,
    user: null,
  }

  const [user, setUser] = useState(TBDAuthUser);
  
  return (
  <authContext.Provider 
  value={{ user, setUser, TBDAuthUser}}
  >
    {children}
  </authContext.Provider>
  );
  
}

export const AuthContexts = () => useContext(authContext)
