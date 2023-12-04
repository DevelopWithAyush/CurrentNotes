import React from 'react'
import "./Navbar.css"
import { Link ,useNavigate } from 'react-router-dom'

function Navbar(props) {
  const {showalert} = props
  const navigate = useNavigate()

  const handlelogout =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/login')
    showalert("success","successfuly logout")
  }

  return (
   <header className="header" id="head">
    <Link to='/' className="logo">CurrentNotes</Link>
    <nav className="navbar" id="nav">
      {!localStorage.getItem('token')?<> <Link to='/login' className='navbar-btn'>login</Link>
        <Link to='/signup' className='navbar-btn'>Signup</Link></>:<div className='enteruser'><p className='username'> hii.. {localStorage.getItem('name')}</p> <button className="logoutbtn" onClick={handlelogout}>Logout</button></div>}
       
    </nav>
   </header>
  )
}

export default Navbar
