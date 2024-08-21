const express =  require('express')
const router = express.Router()
const {registerUser} = require('../controller/userCtrl')

const {getHome,getSignUp,postSignUp,contact} = require('../controller/homeCtrl')
router.get('/home',getHome)
.get('/signUp',getSignUp)
.post('/signUp',registerUser)
.get('/contact',contact)


module.exports = router