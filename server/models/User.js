const mongoose = require('mongoose'); 
const { Schema } = mongoose;
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken'); 

const userSchema = new Schema({
    name: String,
    username: String,
    hash: String,
    salt: String
}); 

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex'); 
}

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    console.log("VALIDATING PASSWORD....");  
    return this.password === password; 
}

userSchema.methods.generateJWT = function() {
    const today = new Date(); 
    const expirationDate = new Date(today); 
    expirationDate.setDate(today.getDate() + 60 ); 
    
    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret'); 
}

const User = mongoose.model('users', userSchema); 
const findAllUsers = function() {
    return User.find({}); 
}

module.exports = {
    User,
    findAllUsers
}