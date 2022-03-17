import Category from "../models/categoryModels.js"
import Product from "../models/productModels.js"


export const getCategories = async (req,res)=>{
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}
export const creatCategories = async (req,res)=>{
    try {
        const {name} = req.body;
        const category = await Category.findOne({name})
        if(category) return res.status(400).json({msg:"This category does not exist"})

        const newCategory = new Category({name})
        await newCategory.save()
        res.json({msg:"Create category success"})
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}
export const deleteCategories = async(req,res)=>{
    try {
        const products =  await Product.findOne({category:req.params.id})
        if(products) return res.status(400).json({
            msg:"Please Delete All Product Relationship"
        })
        await Category.findByIdAndDelete(req.params.id)
        res.json({msg:"Category delete"})
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}
export const updateCategories = async(req,res)=>{
    try {
        const {name} = req.body;
        await Category.findOneAndUpdate({_id:req.params.id},{name})
        res.json({msg:"Update success"})
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}
