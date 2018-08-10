const Article = require('../models/Article'); 

async function getAllArticlesFromDb() {
    const allArticles = await Article.find({
        "pub_date.month": "01"
    }); 
    console.log("FINISHED GETTING ARTICLES"); 
    return allArticles.slice(0, 10); 
}

module.exports = (app) => {
    app.get('/articles', async (req, res) => {
        const allArticlesFromDb = await getAllArticlesFromDb(); 
        console.log("allArticlesFromDb ASSIGNED"); 
        res.json(allArticlesFromDb); 
    })
}; 



