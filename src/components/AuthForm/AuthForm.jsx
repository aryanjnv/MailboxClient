
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from '../store/AuthSlice';

function AuthForm() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [logIn,setLogIn]=useState(false)
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const emailChangeHandler=(e)=>{
      setEmail(e.target.value)
    }
    const passwordChangeHandler=(e)=>{
      setPassword(e.target.value)
    }
    const confirmPasswordChangeHandler=(e)=>{
      setConfirmPassword(e.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault();
      
        const details = {
          email: email,
          password: password,
          confirmPassword: confirmPassword
        };
      
       
        if (logIn) {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhj6U8fFMPXDgJQX33rVHbQSqMAY_5h4E', {
                method: 'POST',
                body: JSON.stringify({
                  email: details.email,
                  password: details.password,
                  returnSecureToken: true
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(res => {
                if (res.ok) {
                  return res.json();
                } else {
                  throw new Error('Authentication Failed');
                }
              })
              .then(data => {

                dispatch(loginUser([data.idToken,details.email]))

                navigate('/inbox');
              })
              .catch(error => {
                console.error('Error during login:', error);
                alert('Authentication Failed');
              });
          }
         else{
                    if(password===confirmPassword){
                        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhj6U8fFMPXDgJQX33rVHbQSqMAY_5h4E',
                  {
                    method:'POST',
                    body:JSON.stringify({
                      email:details.email,
                      password:details.password,
                      returnSecureToken:true
                    }),
                    headers:{
                      'Content-Type':'application/json'
                    }
                  }).then(res=>{
                  
                    if(res.ok){
                       
                       console.log('User has successfully signed up.')
                    }else{
                      return res.json().then((data) => {
                        let errorMessage = "Authentication Failed!";
                        if (data && data.error.message && data.error.message) {
                          errorMessage = data.error.message;
                        }
                        alert(errorMessage);
                      });
                    }
                  })
                 .catch(error => {
                    console.error('Error during sign up:', error);
                   
                  
                 });
                    }
                    else{
                       alert("password and confirm password doesn't match")
                    }
                 
                
                 }
      
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      };

    const switchToggleHander=()=>{
        setLogIn(prev=>!prev)
    }
  return (
    <div style={{  display: 'flex', justifyContent: 'center',  alignItems: 'center',height: '100vh'}}>
    <div style={{ border: '1px solid #ced4da', padding: '20px', borderRadius: '5px',width:'400px',height:'420px', display: 'flex', justifyContent: 'center',  alignItems: 'center' }}>
    <Form onSubmit={submitHandler}>
    <Form.Text  muted>
     {!logIn ? <h2 style={{textAlign:'center'}}>SignUp</h2>: <h2 style={{textAlign:'center'}}>LogIn</h2>}
      </Form.Text>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={email}
          onChange={emailChangeHandler}
          required
          style={{ width: '300px', border: '1px solid black' }} 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={passwordChangeHandler}
          required
          style={{ width: '300px', border: '1px solid black' }} 
        />
      </Form.Group>
   { !logIn &&  <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label> Confirm Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Conirm Password" 
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          required
          style={{ width: '300px', border: '1px solid black' }} 
        />
      </Form.Group>}
      <Form.Text  muted>
     {logIn && <p onClick={switchToggleHander}>Forgot password</p>}
      </Form.Text>
      <Form.Text  muted>
     {!logIn ?<p style={{cursor:"pointer"}} onClick={switchToggleHander}>Already have an Account ? login</p>:<p style={{cursor:"pointer"}} onClick={switchToggleHander}>Don't have an account ? signup</p>}
      </Form.Text>
    
   { !logIn ?<Button variant="primary" type="submit">
        SignUp
      </Button>:
      <Button variant="primary" type="submit">
      LogIn
    </Button>}
    </Form>
    </div>
    </div>
  );
}

export default AuthForm;
