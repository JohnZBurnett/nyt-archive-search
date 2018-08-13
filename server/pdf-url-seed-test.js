  axios.get("https://timesmachine.nytimes.com/svc/tmach/v1/refer?res=9A01E2DC143CEE3BBC4950DFB5668388659EDE&pdf=true")
    .then( resp => {
      pdf_url = resp.request.res.responseUrl.split(".html")[0]+".pdf";
      console.log("PDF URL: ", pdf_url)
    } ); 

    "https://query.nytimes.com/gst/abstract.html?res=9A01E2DC143CEE3BBC4950DFB5668388659EDE&pdf=true"
    "?res=9A01E2DC143CEE3BBC4950DFB5668388659EDE&pdf=true"

    "https://timesmachine.nytimes.com/svc/tmach/v1/refer" + web_url.split(".html")[1]