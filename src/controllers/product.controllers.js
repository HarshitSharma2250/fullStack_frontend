const productSchema=require("../model/product.model")

const Createproduct=async(req,res)=>{
    const{name,description}=req.body
    try {
        const addTodo=new productSchema({name,description,userId:req.user._id})
        await addTodo.save()
        res.status(201).json({
            message:"product created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            Singnature:"invalid hein"
        })
    }
}

const updateproduct=async(req,res)=>{
 const{id}=req.params
    const data=req.body
    try {
        const checkId=await productSchema.findById(id)
        if(!checkId){
        return res.status(409).json({
            message:"data is not found"
        })
        }
        await productSchema.findByIdAndUpdate({_id:id},data)
        res.status(200).json({
            message:"data is updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const deleteproduct=async(req,res)=>{
    const{id}=req.params
    try {
        const checkId=await productSchema.findById(id)
        if(!checkId){
        res.status(409).json({
            message:"data is not found"
        })
        }
        await productSchema.findByIdAndDelete({_id:id})
        res.status(200).json({
            message:"data is updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const GetAlldata=async(req,res)=>{
    try {
        const getalldata=await productSchema.find()
        res.status(200).json({
            getalldata
        })
    } catch (error) {
        
    }
}

module.exports={Createproduct,updateproduct,deleteproduct,GetAlldata}