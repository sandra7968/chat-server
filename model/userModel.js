const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Cannot be blank!']
    },
    email: {
        type:String,
        lowercase: true,
        unique: true,
        required: [true, "Cannot be blank!"],
        index: true,
        validate: [isEmail,"Invalid Email"]
    },
    password: {
        type:String,
        required: [true, "Cannot be blank!"]
    },
    confirmPassword: {
        type:String,
        required: [true, "Cannot be blank!"]
    },
    picture: {
        type:String,
    },
    newMessages: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        default: 'online'
    }
}, {minimize: false})

userSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err,salt)=>{
    if(err) return next(err)
    bcrypt.hash(user.password, salt ,function(err,hash){
    if(err) return next(err)
    user.password = hash
    next()
     })
  })
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

userSchema.statics.findByCredentials = async function(email,password){
    const user = await users.findOne({email})
    if(!user) throw new Error('Invalid email or password')
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error('Invalid email or password')
    return user
}

const users = mongoose.model('users', userSchema)
module.exports = users