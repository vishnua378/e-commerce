
const User = require('../models/User');

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

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

 module.exports = {registerUser};