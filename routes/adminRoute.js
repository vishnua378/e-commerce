const express = require("express");
const router = express.Router();
const {getProductadd,getCategory,getOrders,getAdmindashboard} = require("../controller/adminCtrl")

router.get("/admin-login",getAdmindashboard);
router.get("/admin-productpage",getProductadd);
router.get('/admin-category',getCategory);



router.get('/admin-orders',getOrders);



module.exports = router;