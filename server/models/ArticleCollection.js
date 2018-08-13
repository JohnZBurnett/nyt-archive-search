const mongoose = require('mongoose');
const { Schema } = mongoose;
const articleSchema = require('./Article').articleSchema;  

const articleCollectionSchema = new Schema({
    name: String,
    articles: [articleSchema]
});

const ArticleCollection = mongoose.model('articlecollection', articleCollectionSchema); 

module.exports = {
    ArticleCollection
}  