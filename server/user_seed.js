const mongoose = require('mongoose'); 
const User = require('./models/User').User; 
const keys = require('./config/keys'); 

mongoose.connect(keys.MONGO_DEV_URI);

const newUser = new User({
    name: "John",
    username: "jzb"
})

newUser.setPassword('password');
newUser.save(); 


