const jwt=require("jsonwebtoken")
const userSchema=require("../model/user.model")
const productSchema=require("../model/product.model")

const Authentication=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(404).json({
                message:"token not found or invalid token"
            })
        }
const decoded = jwt.verify(token, 'masai');
req.user=await userSchema.findById(decoded.userId)
next()
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}

const Autherisation=async(req,res,next)=>{
try {
    const {id}=req.params
    const checkproduct=await productSchema.findById(id)
    if(checkproduct.userId.toString()!==req.user._id.toString()){
       return res.status(409).json({
            message:"you are not autherized"
        })
    }

next()
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}


module.exports={Authentication,Autherisation}