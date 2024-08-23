
const User = require('../models/User');

const bcrypt = require('bcrypt');


registerUser = async (req, res) => {
    try {
        console.log('reached register')
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signUp',{ error: "Email already in use" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        req.session.user =  newUser
        // res.status(201).json(newUser);
        return res.render('index', { success: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

login = async (req, res) => {
    try {
        console.log("reached login side successfully");

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: "Invalid email or password",isAutenticated:false });
        }
        console.log("blaa")

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("gehiohaa") 
        if (!isMatch) {
            return res.render('login', { error: "Invalid email or password",isAutenticated:false });
        }
        req.session.user = user;


        return res.redirect('/home');

    } catch(error) {

        console.log('error here ', error.message)
        res.status(500).json({error:"server error"});
    }
};

 module.exports = {registerUser,login};


