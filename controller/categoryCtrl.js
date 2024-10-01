const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {

    const { name,description } = req.body;
    console.log(req.body);

    const  isCategory = await Category.findOne({ name });

    if (isCategory) {
      return res.status(400).json({ message: "Category already there" });
    }

    const category = new Category({ name, description });
    await category.save();
    res.redirect('/admin/admin-category')

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error.message);
  }
};

const updateCategorypage = async (req,res) =>{
  try {
    
    const categoryId=req.params.id;
    console.log(categoryId);
      const categories= await Category.findById(categoryId);
      if(!categories){
          res.status(404).json({success:false,message:'Category not found'})
      }
      res.render('admin/editCategory',{category: categories});
  } catch (error) {
      console.error(error.message);
      res.status(500).json({success:false,message:'Internal Server error'});
  }
}


const updateCategory = async(req,res)=>{

  try{
    const categoryId = req.params.id;
    const {name,description} = req.body;
    console.log(req.body)

    await Category.findByIdAndUpdate(categoryId,{name,description});
    res.redirect('/admin/admin-category');

  }catch(error){
    console.log(error.message);
    res.status(500).json({success:false,message:"Internal server error"});
  }

}

const deleteCategory = async(req,res) =>{
  try{
    const categoryId = req.params.id;
    console.log(categoryId)
    await Category.findByIdAndDelete(categoryId);
    res.redirect('/admin/admin-category')
  }
  catch(error){
    console.log(error.message);
    res.status(500).json({success:false,message:"Internal Server error"});

  }
}




module.exports = { createCategory,updateCategorypage,updateCategory,deleteCategory};
