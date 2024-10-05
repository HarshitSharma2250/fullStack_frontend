const {Router}=require("express")
const {register,Login}=require("../controllers/user.controller")
const userRouter=Router()

userRouter.post('/user/register',register)
userRouter.post('/user/login',Login)
module.exports=userRouter