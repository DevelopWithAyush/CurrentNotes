import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
function Login(props) {
  const {showalert} = props
  const navigate = useNavigate()
  const [credentials,setCredentials] = useState({email:"",password:""})
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/login`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
      })
      const json =await response.json()
      if(json.success === true){
        localStorage.setItem("token",json.authToken)
        localStorage.setItem("name",json.user.name)
        showalert("success","successfully loged in")
        navigate('/')  
      }else{
        console.log("nahi ho paya bhai ")
        showalert("error", json.error)
      }
      
      
    } catch (error) {
      showalert("error","Internal server problem")
      
    }

  }
  const onchange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
      return (
    <div className="loginbox">
 <form className='login' onSubmit={handleSubmit}>
  <h1 className="heading">login</h1>
  <input type="email" name='email' placeholder='Enter your email here'  onChange={onchange}/>
  <input type="password" name='password' placeholder='Enter your password here' onChange={onchange}/>
  <div className="btn">
    <Link to='/signup' className='loginbtn'>create account</Link>
  <button type='submit' className='loginbtn' onClick={handleSubmit}> submit</button>
  </div>
 </form>
    </div>

  )
}

export default Login
