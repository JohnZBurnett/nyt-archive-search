const ArticleCollection = require('./models/ArticleCollection').ArticleCollection; 
const Article = require('./models/Article').Article; 
const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.MONGO_DEV_URI); 

const thisArticle = Article.findById('5b6b46a5f013e485332a709f');

const newCollection = new ArticleCollection({
    name: 'foo',
    articles: [
       thisArticle
    ]
})

newCollection.save(); 