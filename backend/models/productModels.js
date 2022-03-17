import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    images:{
        type:Object,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    sold:{
        type:Number,
        default:0
    },
    checked:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Products = mongoose.model("Products",productSchema)
export default Products