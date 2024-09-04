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
  forget_password:(req,res)=>{
    res.render('forget_password');
  },

  logout:(req,res)=>{
    req.session.destroy(()=>{    
      res.redirect("/home")
      
    })
  },
  update_password:(req,res)=>{
    res.render('update_password');
  }
};
