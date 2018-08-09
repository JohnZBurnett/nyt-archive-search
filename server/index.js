const mongoose = require('mongoose'); 
const keys = require('./config/keys');
const Article = require('./models/Article'); 
const express = require('express');

mongoose.connect(keys.MONGO_DEV_URI);

async function getAllArticles() {
    const allArticles = await Article.find({
    }); 
    console.log("LENGTH OF ALL ARTICLES: ", allArticles.length); 
    console.log(allArticles[0].snippet);
    mongoose.connection.close();
}

getAllArticles(); 