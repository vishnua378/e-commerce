  const User = require("../models/User");
  const sendEmail = require("../utilities/sendmail");
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const validatePassword = require("../passwordValidator");


 
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        isAdmin: false 
      });

      await newUser.save();

 
      req.session.user = newUser;
      const isAuthenticated = req.session.user ? true:false;
      
      if (newUser.isAdmin) {
        res.status(200).redirect('/admin-login');
      } else {
        res.status(200).redirect('/login');
      }

    } else {
      res.status(400).render("signUp", { error: "Email already in use" });
    }

  } catch (error) {
    console.error("Error during registration: ", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isAuthenticated = req.session.user ?true:false;
    

  
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing email or password" });
    }

    const findUser = await User.findOne({ email });
    console.log(findUser);
    if (!findUser) {
      return res.status(401).json({ success: false, message: "Invalideee email or password",isAuthenticated:false});
    }
    
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      console.log(findUser.password+'+++',password)
      return res.status(401).json({ success: false, message: "Invalid emaillllllll or password",isAuthenticated:false });
    }


  
    req.session.user = findUser;

  
    if (findUser.isAdmin) {
      return res.redirect("/admin/admin-login");
    } else {
      return res.redirect("/home");
    }

  } catch (err) {
    console.error("Error during login:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};



 



const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("forget body ", req.body);

    let finduser = await User.findOne({ email });

    if (!finduser) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    req.session.email = email;
    req.session.otp = otp;

    const resetToken = jwt.sign({ id: finduser._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    const resetUrl = `http://yourfrontend.com/passwordreset/${resetToken}`;

    const message = `You requested a password reset. Your OTP is: ${otp}\n\nClick the following link to reset your password: ${resetUrl}`;

    await sendEmail({
      email: email,
      subject: `Password Reset Request otp`,
      message: message,
    });
    console.log("email send ");

    res
      .status(200)
      .json({
        success: true,
        message: "Password reset message sent to your email",
      });
  } catch (error) {
    console.log(error.message);
    console.log("thank you");
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { userOtp } = req.body;
    console.log(userOtp);

    if (req.session.otp == userOtp) {
      const email = req.session.email;
      const user = await User.findOne({ email });
      delete req.session.email;

      req.session.user = user;
      res.status(200).json({ success: true, message: "validation success" });
      console.log("Validation success");
    //   res.render('/update_password')
      4


    } else {
      res.status(200).json({ success: false, message: "not validated" });
      console.log("not valid");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    const validateError = validatePassword(password);

    if (validateError) {
      return res.status(400).json({ error: validateError });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password not match" });
    }

    
    const hashedPassword = await bcrypt.hash(password,10);

    await User.findByIdAndUpdate(req.session.user._id,{password:hashedPassword});


    res.status(200).json({ message: "Password changed success" });
  } catch(error) {

    res.status(500).json({ error: "Some error in resetting!!!" });
    console.log(error);
    
  }
};


module.exports = { registerUser,login,forgotpassword,verifyOtp,resetPassword };
