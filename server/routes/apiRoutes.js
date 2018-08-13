const Article = require('../models/Article'); 
const passport = require('passport'); 

async function getAllArticlesFromDb() {
    const allArticles = await Article.find({
        "pub_date.month": "01"
    }); 
    console.log("NUMBER OF ARTICLES FETCHED: ", allArticles.length); 
    return allArticles; 
}

module.exports = (app) => {
    app.get('/articles', async (req, res) => {
        const allArticlesFromDb = await getAllArticlesFromDb(); 
        console.log("allArticlesFromDb ASSIGNED"); 
        res.json(allArticlesFromDb); 
    })

    app.post('/api/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'})
    )

    app.get('/api/current_user', (req, res) => {
        console.log("CURRENT USER: ", req.user);
        res.send(req.user);  
    })
}; 



