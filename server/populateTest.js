const ArticleCollection = require('./models/ArticleCollection').ArticleCollection; 
const Article = require('./models/Article').Article; 
const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.MONGO_DEV_URI); 

ArticleCollection.findOne({ name: 'foobar' })
      .populate('articles')
      .exec( function (err, articleCollection) {
          if (err) return handleError(err);
          console.log(articleCollection); 
      })