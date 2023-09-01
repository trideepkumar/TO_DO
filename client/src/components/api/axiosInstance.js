import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',

  //timeout implementation
  
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed
    withCredentials: true
  },
});

export default instance;