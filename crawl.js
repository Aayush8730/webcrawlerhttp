const {JSDOM}  = require('jsdom')

async function crawlPage(baseURL , currentURL , pages){
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if(baseURLObj.hostname !== currentURLObj.hostname){
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);

  if(pages[normalizedCurrentURL] > 0 ){
    pages[normalizedCurrentURL]++;
    return pages
  }

  pages[normalizedCurrentURL]=1
  console.log(`actively crawling ${currentURL}`)

  try{
   const resp = await fetch(currentURL);
   if(resp.status > 399){
    console.log(`error in fetch status code : ${resp.status} on page: ${currentURL}`)
    return pages
   }
   const contentType  = resp.headers.get("content-type")
   if(!contentType.includes('text/html')){
    console.log(`non-html response, content type: ${contentType} on page: ${currentURL}`)
    return pages
   }
   const htmlBody = await resp.text();
   const nextUrls = getURLsFromHTML(htmlBody,baseURL);

   for(const nextUrl of nextUrls){
      pages = await crawlPage(baseURL,nextUrl,pages);
   }
  }catch(error){
    console.log(`error connecting to the page ${currentURL} ` + error.message)
  }
  return pages;
}

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
  getURLsFromHTML,
  crawlPage
}