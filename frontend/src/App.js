import './App.css';
import NoteState from '../src/Context/NoteState';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/login/Login';
import SignUp from './Components/SignUp/SignUp';
import Alert from "./Components/Alert/Alert"
import { useState } from 'react';
function App() {
  const [alert,setalert]= useState()

  const showalert = (typ,message)=>{
setalert({
  type:typ,
  message:message
})
setTimeout(() => {
  setalert(null)
}, 2000);
  }
  return (
   <>
   <NoteState showalert ={showalert}>
    <Router>
    <Navbar showalert = {showalert}/>
    <Alert alert={alert}/>
    <Routes>
      <Route path='/' element={<Home showalert = {showalert}/>}></Route>
      <Route path='/login' element={<Login showalert = {showalert}/>}></Route>
      <Route path='/signup' element={<SignUp showalert = {showalert}/>}></Route>
    </Routes>
    </Router>
   </NoteState>
   </>
  );
}
 
export default App;
