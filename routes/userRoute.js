const express = require('express');
const router = express.Router();
const { registerUser,login,forgotpassword,verifyOtp} = require('../controller/userCtrl');

router.post('/register', registerUser);
router.post('/login',login)
router.post('/forgetpassword',forgotpassword)
router.post('/verifyOtp',verifyOtp)

module.exports = router;
