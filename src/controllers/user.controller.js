const userSchema=require("../model/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const register=async(req,res)=>{
const data=req.body
    try {
if(!data || !data.email){
    return res.status(400).json({
        message:"please fill email address"
    })
}
const checkData=await userSchema.findOne({email:data.email})
if(checkData){
    return res.status(409).json({
        message:"data already present ! please login"
    })
}
bcrypt.hash(data.password, 5, async function(err, hash) {
    if(err){
        return res.status(500).json({
            message:err.message
        })
    }
    const addData=new userSchema({...data,password:hash})
    await addData.save()
    res.status(201).json({
        message:"user registerd successfully"
    })
});
    } catch (error) {
       res.status(500).json({
        message:error.message
       }) 
    }
}


const Login=async(req,res)=>{
    const {email,password}=req.body
    
    try {
        const checkuerExist=await userSchema.findOne({email})
        if(!checkuerExist){
            return res.status(404).json({
        message:"invalid credentials try again or register "
            })
        }
        
        bcrypt.compare(password,checkuerExist.password , function(err, ress) {
           if(err){
            return res.status(500).json({
                message:err.message
            })
           }
           if(ress){
            const token = jwt.sign({userId:checkuerExist._id}, `masai`,{expiresIn:"1d"});
            const refreshToken = jwt.sign({userId:checkuerExist._id}, `masai`,{expiresIn:"7d"});
            res.setHeader('authorization', `Bearer ${token}`);
            res.setHeader('refresh_auth', `Bearer ${refreshToken}`);
            res.status(200).json({
                message:"user logged in successfully",
                "token":token,
                "refresh-token":refreshToken
            })
           }else{
            res.status(500).json({
                message:"invalid credentials !, please login again or register"
            })
           }
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
    }

module.exports={register,Login}