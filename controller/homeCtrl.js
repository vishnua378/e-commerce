module.exports = {
  getHome: (req, res) => {
    res.render("index");
  },
  getSignUp: (req, res) => {
    res.render("signUp",{error:""});
  },

  contact: (req, res) => {
    res.render("contact");
  },
};



// validator.isStrongPassword(password)