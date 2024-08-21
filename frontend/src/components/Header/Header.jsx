import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {useUserLogoutMutation} from './../../redux/userAPI'
import {setIsLoggedIn, setUser, setToken} from './../../redux/authSlice'
import { useNavigate } from 'react-router-dom';
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from '../../HOC/ThemeProvider';


const Header = () => {
    const [userLogout] = useUserLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const{isDark, setIsDark} = useTheme();

    // const localTheme = JSON.parse(localStorage.getItem('mode'))


    const user = useSelector(state => state.authReducer.user);

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const handleLogout = ()  => {
     setTimeout(()=>{  navigate('/')},100)

  
       userLogout(JSON.parse(localStorage.getItem('token')))  
      dispatch(setIsLoggedIn(false))
      dispatch(setUser(null))
      dispatch(setToken(null))
      localStorage.clear()
     
    }
    return (
        <header className={isDark ? `${styles.header} ${styles.header_darkmode}` : styles.header}>

            <Link to="/" className={styles.logo_link}>Meet Me</Link>
            <nav className={styles.nav}>
                <ul  className={styles.main_nav}>
                <li>
                     <NavLink className={({isActive}) =>  isDark ? isActive ? styles.active : `${styles.dark}` : isActive ? styles.active : `${styles.link}`} to="/about">About</NavLink>
                 </li>
                 <li>
                     <NavLink className={({isActive}) =>  isDark ? isActive ? styles.active : `${styles.dark}` : isActive ? styles.active : `${styles.link}`} to="/products">Products</NavLink>
                 </li>
                <li>
                     <NavLink className={({isActive}) => isDark ? isActive ? styles.active : `${styles.dark}` : isActive ? styles.active : `${styles.link}`} to="/events">Events</NavLink>
                 </li>
                 <li>
                     <NavLink className={({isActive}) =>  isDark ? isActive ? styles.active : `${styles.dark}` : isActive ? styles.active : `${styles.link}`} to="/support">Support</NavLink>
                 </li>
                </ul>
            {isLoggedIn ?
             <ul className={styles.user_nav}>
             <li>
                     <NavLink className={({isActive}) => isActive ? styles.active : styles.link} to="/myevents">My events</NavLink>
                 </li>
                 <li>
                     <NavLink className={({isActive}) => isActive ? styles.active : styles.link} to="/profile">Profile</NavLink>
                 </li>
             </ul>
             :
             <div className={styles.empty_wrapper}></div>
            }
            <div className={styles.wrapper}>
            {user?.username && <p className={styles.username}>Welcome, {user.username}</p>}
                <ul className={styles.auth_nav}>
                    <li className={styles.auth_nav_item}>
                        <Link to={!isLoggedIn && '/login'} onClick={isLoggedIn ? handleLogout  : null} className={isDark ? `${ styles.auth_nav_link} ${ styles.auth_nav_link_darkmode}` : styles.auth_nav_link}>{isLoggedIn ? 'Log out' : 'Log in'}</Link>
                    </li>
             { !isLoggedIn &&     <li className={styles.auth_nav_item}>
                        <Link to="/registration" className={styles.auth_nav_link}>Register</Link>
                    </li>}
                </ul>
                </div> 
            </nav>
            <> {isDark ? <MdOutlineLightMode onClick={()=>{setIsDark(isDark => !isDark)
                 localStorage.setItem("mode", JSON.stringify(false))}} size={'24px'}/> :
<MdLightMode onClick={()=>{setIsDark(isDark => !isDark)
    localStorage.setItem("mode", JSON.stringify(true))
}} size={'24px'} className={styles.lightMode}/>}</>
  
        </header>
    )
}

export default Header;