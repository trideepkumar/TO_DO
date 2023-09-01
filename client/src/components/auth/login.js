import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'
import axiosInstance from '../api/axiosInstance'
import { useDispatch } from 'react-redux'
import { setAuth } from '../app/features/authSlice'



function Login() {

  const [inputs,setInputs] = useState({
    email:"",
    password:""
})
const dispatch = useDispatch()
const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    const formData = {
      email: inputs.email,
      password: inputs.password,
    };
  
    try {
      const response = await axiosInstance.post('/', formData);
      console.log(response.data); 
      console.log(response.data.success)
      if(response.data.success){
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(setAuth(response.data.user))
        navigate('/home')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
     <div className='login-body' sx={{backgroundColor:'grey'}}>
        <form onSubmit={handleSubmit}>
            <Box marginLeft="auto" marginRight="auto" display="flex" flexDirection="column" gap="1rem" justifyContent="center" alignItems="center" marginTop="10%">
             <Typography variant='h3' fontFamily={'fantasy'} color={'grey'}>Log In</Typography>  
             <TextField name='email' onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email' margin="normal" style={{ width: '30%' }} />
             <TextField name='password' onChange={handleChange} value={inputs.password} placeholder="Password" type="password" margin="normal" style={{ width: '30%' }} />
             <Button  type="submit" variant='contained' style={{ width: '30%', backgroundColor: 'white', color:"grey" ,border:'0.5px solid grey'}}>Login</Button>
             <p>Register here ?<Link to='/signup'>Sign Up</Link> </p>
            </Box>
        </form>  
    </div>
    </>
  )
}

export default Login