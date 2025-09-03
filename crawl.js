const {JSDOM}  = require('jsdom')


function getURLsFromHTML(htmlBody,baseURL){
  const dom = new JSDOM(htmlBody) // creates a in memory document object model
  const urls = [];
  const linkElements = dom.window.document.querySelectorAll('a');
  for(const linkElement of linkElements){
    //relative
     if(linkElement.href.slice(0,1) === '/'){
      try{
        const urlObj = new URL(baseURL + linkElement.href)
        urls.push(urlObj.href);
      }catch(error){
        console.log('error with relative url : ' + error.message)
      }
     } // absolute
     else{ 
      try{
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href) 
      }catch(error){
        console.log('error with absolute url : ' + error.message)
      }
     }
  }
  return urls;
}

function normalizeURL(urlString){

  const urlObj = new URL(urlString) /* already converts the url string to lowercase */

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`
  /* for ending slashes */
  if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
    return hostPath.slice(0,-1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML
}