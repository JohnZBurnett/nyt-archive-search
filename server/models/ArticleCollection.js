const mongoose = require('mongoose');
const { Schema } = mongoose;
const articleSchema = require('./Article').articleSchema;  

const articleCollectionSchema = new Schema({
    name: String,
    articles: [ {
        type: mongoose.Schema.Types.ObjectId, ref: 'articles'
    }]
});

const ArticleCollection = mongoose.model('articlecollection', articleCollectionSchema); 

module.exports = {
    ArticleCollection
}  