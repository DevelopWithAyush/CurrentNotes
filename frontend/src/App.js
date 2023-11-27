import './App.css';
import NoteState from '../src/Context/NoteState';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/login/Login';
import SignUp from './Components/SignUp/SignUp';
function App() {
  return (
   <>
   <NoteState>
    <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
    </Routes>
    </Router>
   </NoteState>
   </>
  );
}
 
export default App;
