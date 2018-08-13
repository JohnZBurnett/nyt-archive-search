const mongoose = require('mongoose'); 
const keys = require('./config/keys');
const Article = require('./models/Article'); 
require('./models/User'); 
const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require('cors');  
const passport = require('passport'); 
require('./services/passport'); 

mongoose.connect(keys.MONGO_DEV_URI);

const app = express(); 
app.use(cors()); 
app.use(passport.initialize()); 
app.use(passport.session()); 

require('./routes/apiRoutes')(app); 

app.listen(PORT); 

// async function getAllArticles() {
//     const allArticles = await Article.find({
//     }); 
//     console.log("LENGTH OF ALL ARTICLES: ", allArticles.length); 
//     console.log(allArticles[0].snippet);
//     mongoose.connection.close();
// // }

// getAllArticles(); 