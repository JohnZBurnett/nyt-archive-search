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
}; 



