const Article = require('../models/Article').Article; 
const passport = require('passport'); 
const User = require('../models/User').User; 
const axios = require('axios'); 

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
}; 



