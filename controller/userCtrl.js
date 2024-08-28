
const User = require('../models/User');
const sendEmail=require('../utilities/sendmail')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signUp',{ error: "Email already in use" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        req.session.user =  newUser
        const isAuthenticated = req.session.user ? true:false;

        // res.status(201).json(newUser);
        return res.redirect('/login');
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        console.log("reached login side successfully");

        const { email, password } = req.body;
        const isAuthenticated = req.session.user ? true:false;

        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: "Invalid email or password",isAutenticated:false });
        }

        const isMatch = await bcrypt.compare(password, user.password);

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


const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log( 'forget body ' , req.body);

        let finduser = await User.findOne({ email });

        if (!finduser) {
            return res.status(200).json({ success : false,  message: "User not found" });
        }



        const otp = Math.floor(100000 + Math.random() * 900000);

        req.session.otp = otp;


        const resetToken = jwt.sign({ id: finduser._id }, process.env.JWT_SECRET, { expiresIn: "30m" });


        const resetUrl = `http://yourfrontend.com/passwordreset/${resetToken}`;

        const message = `You requested a password reset. Your OTP is: ${otp}\n\nClick the following link to reset your password: ${resetUrl}`;

        await sendEmail({
            email: email,
            subject: `Password Reset Request otp`,
            message: message
        });
        console.log('email send ') 

        res.status(200).json({success : true ,  message: "Password reset message sent to your email" });
    } catch (error) {
        console.log(error.message);
        console.log("thank you");
        res.status(500).json({ message: "Internal server error" });
    }
}



const verifyOtp = (req , res)=> {
    try {
        const {userOtp} = req.body
        console.log(userOtp);
        
        if(req.session.otp == userOtp){
            res.status(200).json({success : true , message : 'validation success'})
            console.log("Validation success")
        } else {
            res.status(200).json({success  : false , message : 'not validated'})
            console.log("not valid");

        }
    } catch (error) {
        console.log(error.message);
    }
}


 module.exports = {registerUser,login,forgotpassword,verifyOtp};


