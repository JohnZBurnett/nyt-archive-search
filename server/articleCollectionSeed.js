const ArticleCollection = require('./models/ArticleCollection').ArticleCollection; 
const Article = require('./models/Article').Article; 
const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.MONGO_DEV_URI); 

(async function findArticle() {
    const thisArticle = await Article.findById('5b6b46a5f013e485332a7108');

    const newCollection = new ArticleCollection({
        name: 'foo',
        articles: []
    })
    newCollection.articles.push(thisArticle._id); 

    console.log("NEW COLLECTION: ", newCollection);
    
    newCollection.save(); 

    ArticleCollection.findOne({ name: 'foo' })
      .populate('articles')
      .exec( function (err, articleCollection) {
          if (err) return handleError(err);
          console.log(articleCollection); 
      }) 
    console.log("POPULATED: ", populated); 
})();
 

