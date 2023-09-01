const express = require('express');
const mongoose = require('mongoose');
const user_routes = require('./routes/user_routes');
require('dotenv').config(); 
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  };

app.use(express.json());
app.use(cors(corsOptions));
app.use('/', user_routes);


const mongoURL = process.env.MONGO_URL;
const port = process.env.PORT; 
mongoose.connect(mongoURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server is running on port ${port}`);
    });
    console.log('Mongoose connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });