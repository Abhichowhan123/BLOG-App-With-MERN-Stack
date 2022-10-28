import React, { useState } from 'react'
import { Button, Typography,Box, TextField } from '@mui/material';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const naviagte  = useNavigate();
  const dispath = useDispatch();
  const [input, setInput] = useState({
    name:"",
    email:"",
    password:""
  })
  const [isSignup,setIsSignup] = useState(false);

  const handleChange = (e)=>{
    setInput((prevState)=>({
      ...prevState,
    [e.target.name]:e.target.value
    }))
  }
  // send request to backend for login
  const sendRequest  = async(type = "login")=>{
    const res = await axios.post(`http://localhost:5000/${type}`,{
      name:input.name,
      email:input.email,
      password:input.password
    }).catch(error=>console.log(error));
    console.log(res.data)
    const data = await res.data;
    
    return data;
  }
  const handelSubmit = (e)=>{
    e.preventDefault()
    console.log(input)
    if (isSignup){sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispath(authActions.login()))
            .then(()=>naviagte("/blogs"))
            .then(data=>console.log(data.user._id))
  }else{
    sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispath(authActions.login()))
            .then(()=>naviagte("/blogs"))
            .then(data=>console.log(data));
  }
  }
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <Box
            maxWidth={400} 
            display={'flex'} 
            flexDirection= {"column"} 
            alignItems = "center"
            justifyContent={"center"}
            boxShadow= "10px 10px 20px #ccc"
            padding={3}
            margin = "auto"
            marginTop={5}
            borderRadius = {5}
         >
          <Typography variant='h3'>
          {!isSignup?"Login":"Signup"}
          </Typography>

         {isSignup && <TextField 
              name = "name" onChange={handleChange} 
              value={input.name} placeholder='Name'  margin='normal' />}
                  
          <TextField 
              name = "email"
              onChange={handleChange} 
              value={input.email} type={'email'} 
              placeholder='Email' margin='normal'/>
          <TextField 
              name = "password" 
              onChange={handleChange}
              value={input.password} type={'password'} 
              placeholder='Password' margin='normal'/>
          <Button 
              type = 'submit'
              variant='contained'
              sx={{borderRadius:3 ,marginTop:3}} 
              color = "warning"
          >Submit</Button>
          <Button
              onClick={()=>setIsSignup(!isSignup)}
              sx={{borderRadius:3 ,marginTop:3}} 
           >{isSignup?"Login":"Signup"}</Button>
        </Box>
      </form>
    </div>
  )
}
export default Auth