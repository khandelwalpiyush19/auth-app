import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const Signup =  () => {
    const [signupInfo,setSignupInfo] = useState({
        name:'',
        email:'',
        password:''
    })
 const navigate = useNavigate();
 const handleChange = (e) => {
     const {name,value} = e.target
     const copySignupInfo = {...signupInfo};
     copySignupInfo[name] = value;
     setSignupInfo(copySignupInfo)
 }

  const handlesignup= async (e) => {
    e.preventDefault();
    const {name,email,password} = signupInfo;
    if(!name || !email || !password){
        return handleError('All fields are required')
    }
  
  try {
    const url="http://localhost:5000/api/auth/signup"
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(signupInfo)             
    });
    const result = await response.json();
    const{success,message,error} = result;    
    if(success){
        handleSuccess(message);
        setTimeout(()=>{
            navigate('/login')
             },2000)
    }
    else if(error){
        const details = error?.details[0].message
        handleError(details);}
        else if (!success){
            handleError(message)
            }
            console.log(result);
    
} catch (error) {
    handleError(error)
  }}
 
    return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handlesignup}>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={handleChange} value={signupInfo.name} name="name" autoFocusplaceholder='Enter your name..' />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} value={signupInfo.email} placeholder='Enter your email..' />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} value={signupInfo.password} placeholder='Enter your password..' />
        </div>
        <button>confirm</button>
        <span>Already have an account?
        <Link to="/login">Login</Link></span>
   </form>
      <ToastContainer/>
    </div>
  )
}

export default Signup
