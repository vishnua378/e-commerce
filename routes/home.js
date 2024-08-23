const express =  require('express')
const router = express.Router()
const {registerUser,login} = require('../controller/userCtrl')

const {getHome,getSignUp,postSignUp,contact,loginpage,logout} = require('../controller/homeCtrl')
router.get('/home',getHome)
.get('/signUp',getSignUp)
.post('/signUp',registerUser)
.get('/contact',contact)
.get('/login',loginpage)
.get('/logout',logout)



module.exports = router