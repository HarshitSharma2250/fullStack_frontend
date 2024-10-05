const {Router}=require("express")
const {Createproduct,updateproduct,deleteproduct,GetAlldata}=require("../controllers/product.controllers")
const {Authentication,Autherisation}=require("../middleware/AuthMiddleware")
const productRouter=Router()

productRouter.post("/product/add",Authentication,Createproduct)
productRouter.patch("/product/update/:id",Authentication,Autherisation,updateproduct)
productRouter.delete("/product/delete",Authentication,Autherisation,deleteproduct)
productRouter.get("/product/get",Authentication,Autherisation,GetAlldata)

module.exports=productRouter