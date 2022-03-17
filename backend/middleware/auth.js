import jwt from 'jsonwebtoken'

export const auth = (req,res,next)=>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg:"Invaild Authentication"})
        
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err) return res.status(400).json({msg:"Invaild Authentication"})

            req.user = user;
            next()
        })
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}