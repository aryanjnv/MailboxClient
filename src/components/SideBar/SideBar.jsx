import React from 'react'
import classes from './SideBar.module.css'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  const count=useSelector(state=>state.mail.count)
  return (
    <div className={classes.div}>
        <ul className={classes.ul}>
          <NavLink to='/compose-mail' className={classes.NavLink}> <li className={classes.li}>Compose</li></NavLink> 
          <NavLink to='/inbox'  className={classes.NavLink}><li className={classes.li} >Inbox <span className={classes.count}>{count}</span></li></NavLink>  
          <NavLink to='/sent-mail' className={classes.NavLink}>  <li className={classes.li}>Sent Mail</li></NavLink>
        </ul>
    </div>
  )
};

export default SideBar;