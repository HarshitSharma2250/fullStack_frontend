const {Schema,model}=require("mongoose")

const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{type:String,required:true},
    number:{type:Number,
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits and contain only numbers'],
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","other"]
    }
},{
    versionKey:false,
    timestamps:true
})
module.exports=model("user",userSchema)