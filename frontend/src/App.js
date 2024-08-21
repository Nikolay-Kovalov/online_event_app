import './App.css';
import {lazy} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RestrictedRoutes from './components/RestrictedRoutes';
import { useDispatch } from 'react-redux';
import { setToken, setIsLoggedIn, setUser} from './redux/authSlice';
import { useGetCurrentUserQuery } from './redux/currentUserApi';
import { useTheme } from './HOC/ThemeProvider';







const Home = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(()=> import('./pages/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const UpcomingEventsPage = lazy(() => import('./pages/MyEvents/MyEvents'));
const EventsPage = lazy(()=> import('./pages/EventsPage/EventsPage'));
const SupportPage = lazy(() => import('./pages/SupportPage/SupportPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const ProductPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const EventPage = lazy(() => import('./pages/EventPage/EventPage'));
const JoinRoomPage = lazy(() => import('./pages/JoinRoomPage/JoinRoomPage'));



function App() {

  const {isSuccess, currentData} = useGetCurrentUserQuery(JSON.parse(localStorage.getItem('token')));
  const dispatch = useDispatch()
if(JSON.parse(localStorage.getItem('token'))){
  const token = JSON.parse(localStorage.getItem('token'));
dispatch(setToken(token))
dispatch(setIsLoggedIn(true))
isSuccess && dispatch(setUser(currentData.data))
}
const {isDark} = useTheme();
// const localTheme = JSON.parse(localStorage.getItem('mode'))


  return (

    <Router>
    <div className={isDark ? 'dark' : 'light'}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='registration' element={<RestrictedRoutes redirectTo='/profile' component={<RegistrationPage/>}/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='events' element={<EventsPage/>}/>
          <Route path='events/:eventId' element={<JoinRoomPage/>}/>
          <Route path='profile' element={<ProfilePage/>}/>
          <Route path='myevents' element={<UpcomingEventsPage/>}/>
          <Route path='myevents/:eventId' element={<EventPage/>}/>
          <Route path='about' element={<AboutPage/>}/>
          <Route path='products' element={<ProductPage/>}/>
          <Route path='support' element={<SupportPage/>}/>
        </Route>
      </Routes>

     
    </div>
    </Router>

  );
}

export default App;
