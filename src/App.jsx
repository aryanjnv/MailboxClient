import React from 'react';
import {Button} from 'react-bootstrap'
import AuthForm from './components/AuthForm/AuthForm';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import ComposeMail from './components/ComposeMail/ComposeMail';
import Inbox from './components/Inbox/Inbox';
import MailDetails from './components/MailDetail/MailDetails';
import SideBar from './components/SideBar/SideBar';
import SentMail from './components/SentMail/SentMail';
import SentMailDetail from './components/sentMailDetail/sentMailDetail';


function App() {
  const email=localStorage.getItem('email')
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={ <AuthForm/>}/>
      <Route path='/welcome' element={<WelcomePage/>} />
      <Route path='/compose-mail' element={<ComposeMail/>}/>
      <Route path='/inbox' element={<Inbox/>}/>
      <Route path='/inbox/maildetail/:mailId' element={<MailDetails/>}/>
      <Route path='/sent-mail' element={<SentMail/>}/>
      <Route path='/sent-mail/:sentmailId' element={<SentMailDetail/>}/>
    </Routes>
    
    </BrowserRouter>
    
   
    </>
  );
}

export default App;
