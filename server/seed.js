const mongoose = require('mongoose'); 
const keys = require('./config/keys');
const Article = require('./models/Article'); 
const axios = require('axios');
const fs = require('fs'); 

function addArticleToDb(article) {
  const articleUrlChunk = article.web_url.split("=")[1];
  const urlToGetPdf = `https://timesmachine.nytimes.com/svc/tmach/v1/refer?res=${articleUrlChunk}&pdf=true`;
  const newArticle = new Article({
    web_url: article.web_url,
    snippet: article.snippet,
    abstract: article.abstract,
    print_page: article.print_page,
    headline: {
      main: article.headline.main
    },
    keywords: article.keywords,
    pub_date: {
      full_date: article.pub_date,
      year: article.pub_date.split("-")[0],
      month: article.pub_date.split("-")[1],
      day: article.pub_date.split("-")[2].slice(0, 2)
    },
    document_type: article.document_type,
    word_count: article.word_count,
  }); 
  axios.get(urlToGetPdf)
    .then( resp => {
      newArticle.pdf_url = resp.request.res.responseUrl.split(".html")[0]+".pdf";
      newArticle.save(); 
    } ); 
}

console.log(keys.MONGO_DEV_URI); 
mongoose.connect(keys.MONGO_DEV_URI); 

axios.get("https://api.nytimes.com/svc/archive/v1/1934/5.json", {
  'headers': {
    'api-key': "f7aa7845a7624f2babd861b64aa6a116"
  }
})
.then( (resp) => {
  const articles = resp.data.response.docs; 
  const articleChunk = articles.slice(0, 10); 
  articleChunk.forEach( article => addArticleToDb(article)); 
})

setTimeout(function(){
  mongoose.connection.close(); 
}, 10000); 


