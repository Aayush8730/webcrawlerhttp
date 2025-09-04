const {crawlPage}  = require('./crawl')

function main(){
  /* the first two arguments are directory paths eg->
  /Users/aayushpatidar/.nvm/versions/node/v18.7.0/bin/node
  /Users/aayushpatidar/Desktop/webcrawlerhttp/main.js */

   if(process.argv.length < 3){
    console.log("no website provided")
    process.exit(1);
   }

   if(process.argv.length > 3){
    console.log("too many command line arguments")
    process.exit(1);
   }
   const baseURL = process.argv[2];

   console.log(`starting crawl at ${baseURL}`)
   crawlPage(baseURL);
}

main()
