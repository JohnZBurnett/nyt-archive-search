const mongoose = require('mongoose'); 
const keys = require('./config/keys');
const Article = require('./models/Article'); 
const express = require('express');
const PORT = process.env.PORT || 5000; 

mongoose.connect(keys.MONGO_DEV_URI);

const app = express(); 
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