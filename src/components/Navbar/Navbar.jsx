
import React from 'react'
import classes from './Navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/AuthSlice'

const Navbar = () => {
  const isLogIn=localStorage.getItem('isLogin')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  const logouthandler=()=>{
       navigate('/')
       dispatch(logoutUser())
  }
 
  return (
    <nav className={classes.nav}>
        <ul className={classes.ul}>
       
        {/* {!isLogIn &&  <NavLink to='/' className={classes.NavLink}> <li className={classes.li}>Login</li></NavLink> } */}
        {isLogIn &&  <NavLink to='/inbox'  className={classes.NavLink}> <li  className={classes.li}>Inbox</li></NavLink> }
      
        
      {isLogIn &&  <li className={classes.li} onClick={logouthandler}>Logout</li>}
        </ul>
    </nav>
  )
}

export default Navbar
