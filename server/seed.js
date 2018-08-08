const request = require("request"); 
const mongoose = require('mongoose'); 
const keys = require('./config/keys');
const Article = require('./models/Article'); 
const axios = require('axios');

axios.get("https://api.nytimes.com/svc/archive/v1/1934/5.json", {
  'headers': {
    'api-key': "f7aa7845a7624f2babd861b64aa6a116"
  }
})
.then( resp => console.log("AXIOS RESP: ", resp.data))

mongoose.connect(keys.MONGO_DEV_URI); 


request.get({
  url: "https://api.nytimes.com/svc/archive/v1/1934/5.json",
  qs: {
    'api-key': "f7aa7845a7624f2babd861b64aa6a116"
  },
}, function(err, resp, body) {
  console.log("REQUEST: ", request); 
  body = JSON.parse(body);
  bodyDocs = body.response.docs.slice(0, 1);
  bodyDocs.forEach(article => {
    console.log("ARTICLE: ", article); 
    const newArticle = new Article({
      web_url: article.web_url,
      snippet: article.snippet,
      abstract: article.abstract,
      print_page: article.print_page,
      headline: {
        main: article.headline.main
      },
      keywords: article.keywords,
      pub_date: article.pub_date,
      document_type: article.document_type,
      word_count: article.word_count,
    }); 

  	const articleUrlChunk = article.web_url.split("=")[1];
  	const urlForPdf = `https://timesmachine.nytimes.com/svc/tmach/v1/refer?res=${articleUrlChunk}&pdf=true`;
  	request
  	  .get(urlForPdf, function(err, resp, body) {
        console.log("RESP: ", resp.request.href.split(".html")[0]+".pdf");
        newArticle.pdf_url = resp.request.href.split(".html")[0]+".pdf";
        console.log("NEW ARTICLE: ", newArticle); 
      })
  });
})

mongoose.connection.close(); 

