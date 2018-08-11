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

const User = mongoose.model('users', userSchema); 
const findAllUsers = function() {
    return User.find({}); 
}

module.exports = {
    User,
    findAllUsers
}