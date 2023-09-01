const  User = require('../model/user');
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");


const signup = async (req, res) => {
    const {name,email,password} = req.body
    console.log(name,email,password)
    //for existing user validation (user EXIST OR NOT )
    let existingUser;
    try{
        existingUser = await User.findOne({email:email})
        console.log(existingUser)
    }catch(err){
       console.log(err)
    }
    if(existingUser){
        return (
        res.status(400).json({message:'User already exist! LOGIN Instead'})
        )
    }
    // PASSWORD HASHING USING BCRYPTJS

    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
    name:name,
    email:email,
    password:hashedPassword
  });
  console.log(user)
  try {
    await user.save();
    console.log('hello')
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({user:user})
}

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: 'User not registered! Sign up, please.' });
      }
  
      const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid password!' });
      }
  
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
      });
  
      const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.cookie('token', token, cookieOptions).status(200).json({
        success: true,
        user: existingUser,
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while logging in.' });
    }
};
  
const verifyToken = async(req,res,next)=>{
  console.log('verification started');
  const token = req.cookies.token
  if(!token){
    res.status(404).json({message:"No cookie header found"})
  }
  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
    if(err){
      return res.status(400).json({message:'Invalid token found!'})
    }
    console.log(user.id)
    req.id = user.id
  })
  next();
}

const addTask = async (req, res) => {
    try {
      const { tasks, id } = req.body;

      console.log(tasks,id)
  
      if (!id) {
        return res.status(400).json({ message: 'User ID is required.' });
      }
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      user.tasks.push(...tasks);
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  };

const getUser = async(req,res,next)=>{
  console.log('get user started!');
  const userId = req.id
  console.log(userId)
  let user;
  try{
    user = await User.findById(userId,"-password")
    console.log(user);
  }catch(err){
    return new  Error(err)    
  }
  if(!user){
    return res.status(404).json({message:'user not found!'})
  }
  return res.status(200).json({user})
}

// const logout = async(req,res,next)=>{
//   const cookies = req.cookies
//   console.log(cookies)
//   const token = cookies.token
//   console.log(token)
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
//     console.log(decoded)
//     // Token is valid
// } catch (err) {
//   console.log(err)
   
// }
// // Clear the cookies
// res.clearCookie('token')
// return res.status(200).json({message:"Successfully Logout!"})
// }


// const logout = async(req, res, next) => {
//   const cookies = req.cookies;
//   const token = cookies.token;
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     // Token is valid
//     res.clearCookie('token'); // clear cookie by name
//     res.status(200).send('Logout successful'); // send response
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal server error');
//   }
// };



exports.signup = signup
exports.login = login
exports.verifyToken =verifyToken
exports.getUser = getUser
exports.addTask = addTask
// exports.logout =logout



