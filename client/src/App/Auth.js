import React, { createContext, useState, useContext } from 'react'
const data = require('../pages/routes.json')

const authContext = createContext()
export const Auth = () => {
  const [isAuth, setisAuth] = useState({});
  return {
    isAuth,
    Auth() {
       return fetch(data.isAuth, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) return res.json();
          throw new Error('user was not authenticated');
        })
        .then(json => {
          console.log(json.user)
          setisAuth(json.user);
        })
        .catch(err => {
          console.log(err);
          setisAuth({});
        })
      }
  };
}

 

export function AuthProvider({children}) {
  const auth = Auth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer() {
  return useContext(authContext)

}



