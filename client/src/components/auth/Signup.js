import React, { useEffect, useState } from "react";
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'
import { Link} from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

function Signup() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(()=>{
    console.log(inputs)
  },[inputs])

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    const formData = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    };
  
    try {
      const response = await axiosInstance.post('/signup', formData);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          display="flex"
          flexDirection="column"
          gap="1rem"
          justifyContent="center"
          alignItems="center"
          marginTop="10%"
        >
          <Typography variant="h3" fontFamily={"fantasy"} color='grey'>Signup</Typography>
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            placeholder="Username"
            margin="normal"
            style={{ width: "30%" }}
          />
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
            style={{ width: "30%" }}
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="Password"
            type="password"
            margin="normal"
            style={{ width: "30%" }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ width: "30%", backgroundColor: "white", color: "grey",border:'0.5px solid grey' }}
          >
            Signup
          </Button>
          <p>
            Have an account ?<Link to="/">Login</Link>{" "}
          </p>
        </Box>
      </form>
    </div>
  );
}

export default Signup;