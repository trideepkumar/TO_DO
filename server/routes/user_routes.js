const express = require('express');
const router =  express.Router();
const { signup,login,getUser,addTask } = require('../controllers/user_controller');


router.get('/home',getUser)

router.post('/signup',signup)
router.post('/',login)
router.post('/addTask',addTask)



module.exports = router;