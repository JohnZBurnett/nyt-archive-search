  axios.get("https://query.nytimes.com/gst/abstract.html?res=9A01E2DC143CEE3BBC4950DFB5668388659EDE")
    .then( resp => {
      pdf_url = resp.request.res.responseUrl.split(".html")[0]+".pdf";
      console.log("PDF URL: ", pdf_url)
    } ); 

