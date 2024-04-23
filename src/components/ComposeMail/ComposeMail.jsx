import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from './ComposeMail.module.css';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

function ComposeMail() {

    const editor=useRef(null)
    const [to,setTo]=useState('')
    const [subject,setSubject]=useState('')
    const [content,setContent]=useState('')
    const dispatch=useDispatch();
    

    const ToChangeHandler=(e)=>{
        setTo(e.target.value)
    }
    const subjectChangeHandler=(e)=>{
        setSubject(e.target.value)
    }

    const submitHandler=async(event)=>{
        event.preventDefault();


        console.log('In submit handler')
        
        const newSendEmail=to.replace(/[^\w\s]/gi, "");

        const email=localStorage.getItem('email');
        const sendMail2=email.replace(/[^\w\s]/gi, "");
        

        let id=Date.now().toString();
        const newDetails={
            from:email,
            to:newSendEmail,
            subject,
            content,
            id,
            time:new Date().toLocaleString(),
            blueTick:true
            
        } 
        try {
          const response = await fetch(
            `https://mailbox-ac5ed-default-rtdb.firebaseio.com/${newSendEmail}.json`,
            {
              method: "POST",
              body: JSON.stringify(newDetails),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("something went wrong");
          }
          const data = await response.json();
    
          console.log(data);
        } catch (error) {
          throw new Error(error);
        }


        try {
          const response = await fetch(
            `https://mailbox-ac5ed-default-rtdb.firebaseio.com/${sendMail2}sent.json`,
            {
              method: "POST",
              body: JSON.stringify(newDetails),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("something went wrong");
          }
          const data = await response.json();
    
          console.log(data);
        } catch (error) {
          throw new Error(error);
        }

        setTo("");
        setSubject("");
        setContent("");

    }

  return (
    <Form className={classes.composeForm} onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>To:</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email"
        value={to}
        onChange={ToChangeHandler} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Subject:</Form.Label>
        <Form.Control type="text"
         placeholder="Subject"
         value={subject}
         onChange={subjectChangeHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <JoditEditor
        ref={editor}
        value={content}
        onChange={newContent=>setContent(newContent)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
}

export default ComposeMail;
