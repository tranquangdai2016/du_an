import User from '../models/userModels.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const register =async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        const user = await User.findOne({email})
        if(user) return res.status(400).json({msg: "The email already exists"})
        if(password.length<6) return res.status(400).json({msg:"Password is at least 6 characters long"})
        //password encryption
        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new User({
            name,email,password:passwordHash
        })
        await newUser.save();
        //then create jsonwebtoken to autuhentication
        const accesstoken = createAccessToken({id: newUser._id})
        const refreshtoken = createRefToken({id:newUser._id})
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        });
        res.json({accesstoken})

    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}

export const login =async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({msg:"user does not exist"})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:"Incorrect Password"})
        //then create jsonwebtoken to autuhentication
        const accesstoken = createAccessToken({id: user._id})
        const refreshtoken = createRefToken({id: user._id})
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        });
        res.json({accesstoken})
        
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}

export const refreshToken = (req,res) =>{
    try {
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({msg:"Please Login or Register"})
        jwt.verify(rf_token,process.env.JWT_REFRESH,(err,user)=>{
            if(err) return res.status(400).json({msg:"Please Login or Register"})
            const accesstoken = createAccessToken({id:user.id})
            res.json({accesstoken})
        })
        
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }

}

const createAccessToken = (user) =>{
    return jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'17m'})
}
const createRefToken = (user) =>{
    return jwt.sign(user,process.env.JWT_REFRESH,{expiresIn:'1d'})
}

export const logout =async (req,res)=>{
    try {
        res.clearCookie('refreshtoken',{ path: '/user/refresh_token'})
        return res.json({msg:"logout success"})
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}

export const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id ).select('-password')
        if(!user) return res.status(400).json({msg:"User does not exist"})
        res.json(user)
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
    
}

// export const addCart = async(req,res)=>{
//     try {
//         const user = await User.findById(req.user.id)
//         if(!user) return res.status(400).json({msg:"User do not exist"})

//         await User.findOneAndUpdate({_id: req.user.id},{
//             cart: req.body.cart
//         })
//         res.json({msg:"add to cart"})
//     } catch (err) {
//         return res.status(500).json({msg:err.message})
//     }
// }

export const history = async(req,res) =>{
    try {
        const history = await Payments.find({user_id:req.user.id})
        res.json(history)
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}