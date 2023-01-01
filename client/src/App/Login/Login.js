import React from 'react'
import LoginComponent from './LoginComponent'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


function Login( { user } ) {
  const location = useLocation();
  const currPath = location.pathname;

  if (user?.authenticated == null && currPath === '/login') return null;

  if (user?.authenticated == null && currPath === '/') return <LoginComponent/>;

  return (user.authenticated === true) ? <Navigate to='/home' replace/> : <LoginComponent/>
}




export default Login