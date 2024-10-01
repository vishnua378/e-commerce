const express = require('express');
const router = express.Router();

const {createCategory,updateCategorypage,updateCategory,deleteCategory}= require("../controller/categoryCtrl");



router.post('/create',createCategory);
router.get('/edit-Category/:id',updateCategorypage);
router.post('/updateCategory/:id',updateCategory);
router.post('/deleteCategory/:id',deleteCategory)


module.exports = router;