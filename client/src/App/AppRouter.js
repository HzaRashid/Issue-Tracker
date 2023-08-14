import React, { useEffect } from 'react';
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
import { AuthContexts } from './Auth';
import UserInfo from '../components/TopBar/UserInfo';
import { useStateContext } from '../contexts/ContextProvider';
const data = require('../pages/routes.json')

function AppRouter() {
  const { user, setUser, TBDAuthUser } = AuthContexts();
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

    <Route path='/home' element={<PrivateRoute component={<Home />} />} />
    <Route path='/projects' element={<PrivateRoute component={<Projects />} />} />
    <Route path='/projects/:ProjectTitle/backlog/proj-nav=true' element={<PrivateRoute component={<Backlog />} />} />
    <Route path='/projects/:ProjectTitle/sprint-board/:SprintTitle/proj-nav=true' element={<PrivateRoute component={<SprintBoard />} />} />
    <Route path='/issues' element={<PrivateRoute component={<Issues />}/>} />
    <Route path='/team' element={<PrivateRoute component={<Team />}/>} />
    <Route path='/profile' element={<PrivateRoute component={<Profile />} />} />

  </Routes>

  </>
  );
}

const PrivateRoute = ( { component } ) => {
  const location = useLocation();
  const { user } = AuthContexts();
  const { ScreenWidth } = useStateContext();



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
    { ScreenWidth > 880 ? <UserInfo/> : null }
    {component}
    </>
    )
};
 
export default AppRouter