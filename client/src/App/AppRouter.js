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
import ProjectTeam from '../pages/Projects/Team';
import Issues from '../pages/Issues';
import Team from '../pages/Team';
import Profile from '../pages/Profile';
import Popups from '../components/Popups';
import Login from './Login/Demo/Login';
import UserInfo from '../components/TopBar/UserInfo';
import { AuthContexts } from './Auth';
import { useStateContext } from '../contexts/ContextProvider';

// axios.defaults.withCredentials = true
// console.log(axios.defaults)
function AppRouter() {
  const { user, setUser, TBDAuthUser } = AuthContexts();
  useEffect(
    () => {
        fetch(process.env.REACT_APP_API_isAuth, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
        .then(res => res.json())
        .then(json => { setUser({...json}) })
        .catch(err => {
          // console.log(err);
          setUser(TBDAuthUser);
        })
      // eslint-disable-next-line 
    }, []
  )

  // console.log(user)
  return (
  <>
  <Routes>    
    <Route index element={<Login user={user}/>}/>

    <Route path='/login' element={<Login user={user}/>}/>

    <Route exact path='/home' element={<PrivateRoute component={<Home />} />} />
    <Route exact path='/projects' element={<PrivateRoute component={<Projects />} />} />
    <Route exact path='/projects/:ProjectTitle/backlog/proj-nav=true' element={<PrivateRoute component={<Backlog />} />} />
    <Route exact path='/projects/:ProjectTitle/sprint-board/:SprintTitle/proj-nav=true' element={<PrivateRoute component={<SprintBoard />} />} />
    <Route exact path='/projects/:ProjectTitle/team/proj-nav=true' element={<PrivateRoute component={<ProjectTeam />} />} />
    <Route exact path='/issues' element={<PrivateRoute component={<Issues />}/>} />
    <Route exact path='/team' element={<PrivateRoute component={<Team />}/>} />
    <Route exact path='/profile' element={<PrivateRoute component={<Profile />} />} />

  </Routes>

  </>
  );
}

const PrivateRoute = ( { component } ) => {
  const location = useLocation();
  const { user } = AuthContexts();
  const { ScreenWidth, setScreenWidth} = useStateContext(); // eslint-disable-next-line
  useEffect(() => setScreenWidth(window.innerWidth), [window.innerWidth])

  if (user?.authenticated === null) return;

  if (user?.authenticated === false) {
    return(
      <Navigate to='/login' replace state={{ path: location.pathname }}/>
    )
  }
  return (
    <>
    { ScreenWidth > 880 ? <UserInfo/> : null }

    <Nav/>
    <Popups/>
    {component}

    </>
    )
};
 
export default AppRouter