const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const chatServer = express();
require('dotenv').config();

chatServer.use(cors());
chatServer.use(express.json());
mongoose.connect(process.env.MONGO_URL
//     ,{
//     useNewUrlParser: true,
//     useUnifiedTopology:true,
// }
).then(()=>{
    console.log("DB Connection Successful!");
}).catch((err)=>{
    console.log(err.message);
})
const server = chatServer.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
})
