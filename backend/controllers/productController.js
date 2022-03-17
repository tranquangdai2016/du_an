import Products from "../models/productModels.js";


export const getProducts = async (req,res)=>{
    try {
        const features = new APIfeatures(Products.find(),req.query).filtering().sorting().paginating()
                                                
                                                
        const products = await features.query
        res.json({
            status: "success",
            result:products.length,
            products:products
        })
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}

export const createProducts = async (req,res)=>{
    try {
        const {product_id,
                title,
                price,
                description,
                content,
                images,
                category} = req.body;
        if(!images)
            return res.status(400).json({msg:"No image upload"});
        const product = await Products.findOne({product_id});
        if(product)
            return res.status(400).json({msg:"This product already exist"})
        const newProduct = new Products({
            product_id,
            title,
            price,
            description,
            content,
            images,
            category
        })
        await newProduct.save();
        res.json({msg:"Product Create Success"})
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}

export const deleteProducts = async (req,res)=>{
    try {
        await Products.findByIdAndDelete(req.params.id)
        res.json({msg:"Delete a Products"})
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}

export const updateProducts = async (req,res)=>{
    try {
        const { title,
            price,
            description,
            content,
            images,
            category} = req.body;
        if(!images) return res.status(400).json({msg:"No images upload"})
        await Products.findOneAndUpdate({_id:req.params.id},{
            title,
            price,
            description,
            content,
            images,
            category
        })
        res.json({msg:"Update a Products"})
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}

//filter,sort,pagination
 class APIfeatures {
     constructor(query,queryString){
         this.query=query;
         this.queryString = queryString
     }
     filtering(){
         const queryObj = {...this.queryString}
         const excludedFields = ['page','sort','limit']
         excludedFields.forEach(el=>delete(queryObj[el]))
         let queryStr = JSON.stringify(queryObj)
         queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match => '$'+match)
         //gte = greater than or equal
         //lte - lesser than or equal
         //lt = lesser than
         //gt = greater than
         this.query.find(JSON.parse(queryStr))
         return this

     }
     sorting(){
         if(this.query.sort){
             const sortBy = this.queryString.sort
             this.query = this.query.sort(sortBy)
         }else{
             this.query = this.query.sort('-createdAt')
         }
         return this
     }
     paginating(){
         const page = this.queryString.page * 1 || 1
         const limit = this.queryString.limit *1 || 12
         const skip = (page-1) * limit
         this.query = this.query.skip(skip).limit(limit)
        return this
     }
 }