const {Schema,model}=require("mongoose")

const productSchema=new Schema({
    name:{
        type:String,required:true
    },
    description:{
        type:String,required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

module.exports=model("product",productSchema)