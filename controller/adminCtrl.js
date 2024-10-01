const Category = require("../models/Category");

    const getAdmindashboard = (req,res)=>{
    res.render('admin/adminDashboard');
}


const getProductadd =    (req,res)=>{
    res.render('admin/productsadd');
}

const getCategory = async (req,res)=>{
    try{
        const categories = await Category.find();
        res.render('admin/category',{categories});
    }
    catch(error){
        console.log(error.message)
    }
    
}





const getOrders = (req,res)=>{
    res.render('admin/orders')
}

module.exports = {getProductadd,getCategory,getOrders,getAdmindashboard};