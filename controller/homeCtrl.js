module.exports = {
  getHome: (req, res) => {
    const isAuthenticated = req.session.user ? true:false;
    res.render("index",{isAuthenticated});
  },
  getSignUp: (req, res) => {
    res.render("signUp",{error:""});
  },

  contact: (req, res) => {
    res.render("contact");
  },
  loginpage: (req,res)=>{
    res.render('login');
  },

  logout:(req,res)=>{
    req.session.destroy(()=>{    
      res.redirect("/home")
      
    })
  }
};



// validator.isStrongPassword(password)