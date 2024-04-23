
import React from 'react'
import classes from './MailDetails.module.css'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

const MailDetails = () => {
    const items=useSelector(state=>state.mail.items)
    
    const{ mailId}=useParams();
    const mail = items.find(product => parseInt(product.id) === parseInt(mailId));
   
 
    if (!mail) {
        return <div className={classes.productDetail}>Product not found</div>;
    }
  return (
    <div>
        <h3 className={classes.subject}>Subject:{mail.subject} </h3>
        <div className={classes.emailtime}>
        <h5> {mail.from}</h5>
        <p>{mail.time}</p>
       </div>
       <p className={classes.context}>{mail.content}</p>

    </div>
  )
}

export default MailDetails
