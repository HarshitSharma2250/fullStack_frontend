const express=require("express")
require("dotenv").config()
const connection=require("./config/db")
const userRouter=require("./routes/user.routes")
const cors = require('cors')
const productRouter=require("./routes/product.routes")

// add port number
const PORT=process.env.PORT||3000



// initilizing the server
const server=express()



// middleware
server.use(express.json())
server.use("/api",userRouter)
server.use("/api",productRouter)
server.use(cors())


//lestening the server
server.listen(PORT,async()=>{
    try {
        await connection()
        console.log(`server is running at port ${PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})