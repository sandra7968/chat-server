const users = require('../model/userModel')

// register
exports.register = async (req,res)=>{
    try{
        const {name,email,password,confirmPassword,picture} = req.body
        console.log(req.body);
        const user = await users.create({name,email,password,confirmPassword,picture})
        res.status(201).json(user)
    }catch(err){
        let msg
        if(err.code == 11000){
            msg = "User already exists! Please login!"
        }else{
            msg= err.message
        }
        console.log(err);
        res.status(400).json(msg)
    }
}

// login
exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await users.findByCredentials(email,password)
        user.status = "online"
        await user.save()
        res.status(200).json(user)
    }catch(err){
        res.status(400).json(e.message)
    }
}

