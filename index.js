require('dotenv').config();
const express = require('express')
const cors = require('cors') 
const chatServer = express();
const userRoutes = require('./routes/userRoutes')
require('./connection')

chatServer.use(cors());
chatServer.use(express.urlencoded({extended:true}))
chatServer.use(express.json());
chatServer.use('/users',userRoutes)
const server = require('http').createServer(chatServer)
const PORT = 5000
const io = require('socket.io')(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    }
})

server.listen(PORT, ()=>{
    console.log('listening to port', PORT);
})