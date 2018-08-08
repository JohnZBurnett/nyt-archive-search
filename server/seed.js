const request = require("request"); 
const mongoose = require('mongoose'); 
const keys = require('./config/keys');

mongoose.connect(keys.MONGO_DEV_URI); 


request.get({
  url: "https://api.nytimes.com/svc/archive/v1/1934/5.json",
  qs: {
    'api-key': "f7aa7845a7624f2babd861b64aa6a116"
  },
}, function(err, resp, body) {
  body = JSON.parse(body);
  bodyDocs = body.response.docs.slice(0, 1);
  bodyDocs.forEach(article => {
    console.log("ARTICLE: ", article); 
  	const articleUrlChunk = article.web_url.split("=")[1];
  	const urlForPdf = `https://timesmachine.nytimes.com/svc/tmach/v1/refer?res=${articleUrlChunk}&pdf=true`;
  	request
  	  .get(urlForPdf, function(err, resp, body) {
  	  	console.log("RESP: ", resp.request.href.split(".html")[0]+".pdf"); 
  	  })
  });
})


