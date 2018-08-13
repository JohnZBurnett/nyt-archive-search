const mongoose = require('mongoose'); 
const keys = require('./config/keys');
const cookieSession = require('cookie-session'); 
const Article = require('./models/Article'); 
const bodyParser = require('body-parser'); 
// const session = require('express-session'); 
require('./models/User'); 
require('./models/User').User; 
const express = require('express');

const cors = require('cors');  
const passport = require('passport'); 
require('./services/passport'); 

const PORT = process.env.PORT || 5000;
mongoose.connect(keys.MONGO_DEV_URI);

const app = express(); 

app.use(cors()); 

app.use(cookieSession({
    name: 'session',
    keys: [keys.COOKIE_KEY],

    maxAge: 24 * 60 * 60 * 1000
}))

// app.use(session({ secret: 'dogs', cookie: {
//     secure: false
// }})); 

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(passport.initialize()); 
app.use(passport.session()); 

require('./routes/apiRoutes')(app); 

app.listen(PORT); 

// async function getAllArticles() {
//     const allArticles = await Article.find({
//     }); 
//     console.log("LENGTH OF ALL ARTICLES: ", allArticles.length); 
//     console.log(allArticles[0].snippet);
//     mongoose.connection.close();
// // }

// getAllArticles(); 