const Article = require('../models/Article').Article; 
const passport = require('passport'); 
const User = require('../models/User').User; 
const axios = require('axios'); 
const ArticleCollection = require('../models/ArticleCollection').ArticleCollection;
const Comment = require('../models/Comment').Comment;  

async function getAllArticlesFromDb() {
    const allArticles = await Article.find({
        "pub_date.month":"01"
    }).lean(); 
    console.log("NUMBER OF ARTICLES FETCHED: ", allArticles.length); 
    return allArticles; 
}

async function populateAndSendArticleCollections(articleCollections, res) {
    console.log("ARTICLE COLLECTIONS: ", articleCollections); 
    // articleCollections.populate('articles')
    //   .populate('users')
    //   .exec( function(err, articleCollection) {
    //       if (err) return handleError(err);
    //       console.log("POPULATED ARTICLE COLLECTION: ", articleCollection); 
    //   }) 

}

module.exports = (app) => {
    app.get('/articles', async (req, res) => {
        const allArticlesFromDb = await getAllArticlesFromDb(); 
        console.log("allArticlesFromDb ASSIGNED"); 
        res.json(allArticlesFromDb); 
    })

    app.post('/api/login', passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/login'})
    )

    app.post('/api/register', (req, res) => {
        console.log("REGISTER REQUEST BODY: ", req.body); 

        // we'll put this back in later - hyphen was causing a problem

        // if (req.body.password !== req.body.confirm-password) {
        //     res.redirect('/'); 
        // }

        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        })

        newUser.save(function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('user' + newUser.username + 'saved.'); 
            }
            req.login(newUser, function(err) {
                if(err) {
                    console.log(err); 
                }
                return res.redirect('/'); 
            })
        })
    })

    app.get('/api/logout', (req, res) => {
        console.log("WE HIT THE LOGOUT ROUTE"); 
        req.logout(); 
        res.send(req.user); 
    })

    app.get('/api/current_user', (req, res) => {
        console.log("CURRENT PASSPORT SESSION: ", req.session); 
        console.log("CURRENT USER: ", req.user);
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
        // needed due to the use of 'withCredentials' when the client GETs this route 
        res.setHeader('Access-Control-Allow-Credentials', 'true'); 
        res.send(req.user);  
    })

    app.post('/api/current_article', async (req, res) => {
        console.log("REQUEST BODY: ", req.body); 

        // this needs to get an article web URL (passed into req body from frontend)
        const resp = await axios.get("https://timesmachine.nytimes.com/svc/tmach/v1/refer" + req.body.web_url.split(".html")[1]); 
        const pdf_url = resp.request.res.responseUrl.split(".html")[0]+".pdf";
        console.log(pdf_url); 
        const body = {
            pdfUrl: pdf_url
        }
        res.send(body); 
    })

    app.get('/api/articlecomments', async(req, res) => {
        const comments = await Comment.find({

        }); 
        Comment.findOne({}).populate('users', 'username').exec( function (err, comment) {
            if (err) return handleError(err);
            console.log("WE'RE IN THE POPULATE"); 
            console.log("POPULATED COMMENT: ", comment); 
            
        })
        res.send(comments); 
    })

    app.get('/api/articlecomments/:id', async(req, res) => {
        console.log("ARTICLE COMMENTS HIT"); 
        const articleResult = await Article.findById(req.params.id); 
        const commentResults = await Comment.find({
            article: articleResult._id
        }); 

        res.send(commentResults); 
    }); 

    app.post('/api/articlecomments/:id', async(req, res) => {
        console.log("PARAMS ID: ", req.params); 
        const newComment = new Comment({
            body: req.body.commentBody,
            article: req.params.id,
            user: req.body.user
        });
        const saveResult = await newComment.save(); 
        res.send(newComment); 
    })

    app.get('/api/pdf_data', async (req, res) => {
        const resp = await axios.get('https://timesmachine.nytimes.com/timesmachine/1943/01/01/83892511.pdf'); 
        console.log("PDF RESPONSE BODY: ", resp.data); 
        res.send(resp.data); 
    })

    app.get('/api/collections', async (req, res) => {
        const allArticleCollections = await ArticleCollection.find({}); 
        populateAndSendArticleCollections(allArticleCollections, res); 
        res.send(allArticleCollections); 
    })

    app.post('/api/collections', async (req, res) => {
        console.log("REQUEST ARRIVED: ", req.body); 
        const newArticleCollection = new ArticleCollection({
            name: req.body.name,
            articles: [
            ],
            user: req.body.user
        }); 
        newArticleCollection.save();
        res.send(newArticleCollection); 
    })

    app.put('/api/collections/:id', async (req, res) => {
        const articleCollectionId = req.params.id;
        const thisArticleCollection = await ArticleCollection.findById(articleCollectionId); 
        thisArticleCollection.articles = req.body.articles;
        thisArticleCollection.save(); 
        res.send(thisArticleCollection); 
    })

    app.delete('/api/collections/:id', async (req, res) => {
        const deletedCollection = await ArticleCollection.deleteOne({ 
            _id: req.params.id
        }, function (err) {
            if (err) return handleError(err)
        }); 
        res.send(deletedCollection); 
    })
}; 



