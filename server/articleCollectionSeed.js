const ArticleCollection = require('./models/ArticleCollection').ArticleCollection; 
const Article = require('./models/Article').Article;
const User = require('./models/User').User; 
const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.MONGO_DEV_URI); 

(async function findArticle() {
    // const thisArticle = await Article.findById('5b6b46a5f013e485332a7108');
    // const thisUser = await User.findById('5b71f2f1000b754c78646d35'); 
    // const newCollection = new ArticleCollection({
    //     name: 'foo',
    //     articles: [],
    //     user: ''
    // })
    // newCollection.articles.push(thisArticle._id);
    // newCollection.user = thisUser._id; 

    // console.log("NEW COLLECTION: ", newCollection);
    
    // newCollection.save(); 

    ArticleCollection.findOne({ name: 'foo' })
      .populate('user')
      .exec( function (err, articleCollection) {
          if (err) return handleError(err);
          console.log(articleCollection); 
      }) 
})();
 

