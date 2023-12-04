import React,{useState} from 'react'
import "./SignUp.css"
import { useNavigate,Link } from 'react-router-dom'

function SignUp(props) {
  const {showalert} = props
    const navigate = useNavigate()
    const [credentials,setCredentials] = useState({name:"",email:"",phone:"",password:""})
    const handleSubmit = async(e)=>{
      e.preventDefault()
      try {
        const {name,email,phone,password} = credentials
        const response = await fetch(`http://localhost:8000/createuser`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({name,email,phone,password})
        })
        const json =await response.json()
        if(json.success === true){
            localStorage.setItem("token",json.authToken)
            localStorage.setItem("name",json.user.name)
            showalert("success","successfully signup")
         navigate('/')   
        }else{
          showalert("error",json.error)

        }
        
        
      } catch (error) {
        showalert("error","internal server error")

      }
  
    }
    const onchange = (e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div className="signupbox">
    <form className='signup' onSubmit={handleSubmit}>
     <h1 className="heading">SignUp</h1>
     <input type="text" name='name' placeholder='Enter Your Name Here'  onChange={onchange}/>
     <input type="email" name='email' placeholder='Enter your email here'  onChange={onchange}/>
     <input type="phone" name='phone' placeholder='Enter your phone here'  onChange={onchange}/>
     <input type="password" name='password' placeholder='Enter your password here' onChange={onchange}/>
     <div className="btn">
       <Link to='/signup' className='signupbtn'>Login</Link>
     <button type='submit' className='signupbtn' onClick={handleSubmit}> submit</button>
     </div>
    </form>
       </div>
  )
}

export default SignUp
