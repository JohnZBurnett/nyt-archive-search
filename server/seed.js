const mongoose = require('mongoose'); 
const keys = require('./config/keys');
const Article = require('./models/Article'); 
const axios = require('axios');

mongoose.connect(keys.MONGO_DEV_URI); 

function addArticleToDb(article) {
  // const articleUrlChunk = article.web_url.split("=")[1];
  // const urlToGetPdf = `https://timesmachine.nytimes.com/svc/tmach/v1/refer?res=${articleUrlChunk}&pdf=true`;
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
  newArticle.save(); 
  
//   // this code gets the PDF url, but it'll cause way too many calls to the Times, so we're not going to use it right now
//   // axios.get(urlToGetPdf)
//   //   .then( resp => {
//   //     newArticle.pdf_url = resp.request.res.responseUrl.split(".html")[0]+".pdf";
//   //     return newArticle.save(); 
//   //   } )
//   //   .then( val => console.log(index) )
}

(async () => {
  for (let i = 1; i <= 12; i++) {
    let result = await axios.get(`https://api.nytimes.com/svc/archive/v1/1984/${i}.json`, {
      'headers': {
        'api-key': "f7aa7845a7624f2babd861b64aa6a116"
        }
    });
    result.data.response.docs.forEach(addArticleToDb); 
  }
})();



