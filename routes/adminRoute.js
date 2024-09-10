const express = require("express");
const router = express.Router();


router.get("/admin-login",(req,res)=> res.render("adminDashboard"))



module.exports = router;