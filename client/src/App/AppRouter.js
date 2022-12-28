import React, { useEffect, useState } from 'react';
import '../App.css';
import Nav from '../components/Navbar/Nav';
import { 
    Navigate, 
    // Outlet, 
    Route, 
    Routes, 
    useLocation
   } from 'react-router-dom';
import Home from '../pages/Home';
import Projects from '../pages/Projects/Projects';
import Backlog from '../pages/Projects/Backlog';
import SprintBoard from '../pages/Projects/SprintBoard';
import Issues from '../pages/Issues';
import Team from '../pages/Team';
import Profile from '../pages/Profile';
import Popups from '../components/Popups';
// import { UserContext } from '../contexts/UserContext';
import Login from './Login/Login';
// import { AuthContexts } from './Auth';
const data = require('../pages/routes.json')

function AppRouter() {
  // const { setUser } = AuthContexts();

  // const [user, setUser] = useState({
  //   authenticated: null,
  //   user: null
  // })

  const TBDAuthUser = {
    authenticated: null,
    user: null,
  }
  const [user, setUser] = useState(TBDAuthUser)
  useEffect(
    () => {
        fetch(data.isAuth, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
        .then(res => res.json())
        .then(json => { setUser(json) })
        .catch(err => {
          console.log(err);
          setUser(TBDAuthUser);
        })
      // eslint-disable-next-line 
    }, []
  )

  console.log(user)
  return (
  <>
  <Routes>    
    <Route index element={<Login user={user}/>}/>

    <Route path='/login' element={<Login user={user}/>}/>

    <Route path='/home' element={<PrivateRoute user={user} component={<Home />} />} />
    <Route path='/projects' element={<PrivateRoute user={user} component={<Projects />} />} />
    <Route path='/projects/:ProjectTitle/backlog' element={<PrivateRoute user={user} component={<Backlog />} />} />
    <Route path='/projects/:ProjectTitle/sprint-board/:SprintTitle' element={<PrivateRoute user={user} component={<SprintBoard />} />} />
    <Route path='/issues' element={<PrivateRoute user={user} component={<Issues />}/>} />
    <Route path='/team' element={<PrivateRoute user={user} component={<Team />}/>} />
    <Route path='/profile' element={<PrivateRoute user={user} component={<Profile />} />} />

  </Routes>

  </>
  );
}

const PrivateRoute = ( { component, user } ) => {
  const location = useLocation();

  if (user?.authenticated === null) return;

  if (user?.authenticated === false) {
    return(
      <Navigate to='/login' replace state={{ path: location.pathname }}/>
    )
  }
  return (
    <>
    <Nav/>
    <Popups/>
    {component}
    </>
    )
};
 
export default AppRouter