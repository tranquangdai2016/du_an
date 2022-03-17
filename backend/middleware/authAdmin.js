import User from "../models/userModels.js";

export const authAdmin = async (req,res,next)=>{
    try {
        //get user infomation by id
        const user = await User.findOne({
            _id: req.user.id
        })
        if(user.role === 0)
            return res.status(400).json({msg:"admin resource access denied"})
        next()
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}