import React from 'react';
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
import { Auth } from './Auth';
// const data = require('../pages/routes.json')

function AppRouter() {
  

  return (
  <>
  <Routes>    
    <Route index element={<Login />}/>
    <Route path='/login' element={<Login />}/>

    <Route path='/home' element={<PrivateRoute component={<Home />} />} />
    <Route path='/projects' element={<PrivateRoute component={<Projects />} />} />
    <Route path='/projects/:ProjectTitle/backlog' element={<PrivateRoute component={<Backlog />} />} />
    <Route path='/projects/:ProjectTitle/sprint-board/:SprintTitle' element={<PrivateRoute component={<SprintBoard />} />} />
    <Route path='/issues' element={<PrivateRoute component={<Issues />}/>} />
    <Route path='/team' element={<PrivateRoute component={<Team />}/>} />
    <Route path='/profile' element={<PrivateRoute component={<Profile />} />} />

  </Routes>

  </>
  );
}

// const authContext = createContext();
// const CheckAuth = () => {
//   // const { setisAuthUser } = UserContext();
//   const [isAuthUser, setisAuthUser] = useState(null)

//   return (
//     isAuthUser,

//     fetch(data.isAuth, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Credentials": true,
//       },
//     })
//     .then(res => {
//       console.log(res);
//       if (res.status === 200) return res.json();
//       throw new Error('user was not authenticated');
//     })
//     .then(json => {
//       console.log(json.user)
//       setisAuthUser(json.user);
//     })
//     .catch(err => {
//       console.log(err);
//       setisAuthUser(null);
//     })
//     )
// }

const PrivateRoute = ( { component } ) => {
  const location = useLocation();

  console.log(Auth())
  const { isAuth } = Auth();

  if (!isAuth) {
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

    // eslint-disable-next-line
    {/* <Route path='/home' element={isAuthUser ? <> <Nav/> <Popups/> <Home /> </> : <Login/>}/>
    <Route path='/projects' element={isAuthUser ? <> <Nav/> <Popups/> <Projects /> </>: <Login/>}/>
    <Route path='/projects/:ProjectTitle/backlog' element={isAuthUser ? <> <Nav/> <Popups/> <Backlog /> </> : <Login/>}/>
    <Route path='/projects/:ProjectTitle/sprint-board/:SprintTitle' element={isAuthUser ? <> <Nav/> <Popups/> <SprintBoard /> </> : <Login/>}/>
    <Route path='/issues' element={isAuthUser ? <> <Nav/> <Popups/> <Issues /> </> : <Login/>}/>
    <Route path='/team' element={isAuthUser ? <> <Nav/> <Popups/> <Team /> </> : <Login/>}/>
    <Route path='/profile' element={isAuthUser ? <> <Nav/> <Popups/> <Profile /> </> : <Login/>}/> */}

export default AppRouter