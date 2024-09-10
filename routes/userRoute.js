const express = require('express');
const router = express.Router();
const { registerUser,login,forgotpassword,verifyOtp,resetPassword} = require('../controller/authCtrl');

router.post('/register', registerUser);
router.post('/login',login)
router.post('/forgetpassword',forgotpassword)
router.post('/verifyOtp',verifyOtp)
router.post('/reset-password',resetPassword)

module.exports = router;
