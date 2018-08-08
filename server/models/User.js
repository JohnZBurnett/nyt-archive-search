const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String
}); 

const User = mongoose.model('users', userSchema); 
const findAllUsers = function() {
    return User.find({}); 
}

module.exports = {
    User,
    findAllUsers
}