function printReport(pages){
   const sortedPages = sortPages(pages)
   
   console.log('==================')
   console.log('REPORT')
   console.log('==================')

   for(const sortedPage of sortedPages){
       const url = sortedPage[0];
       const hits = sortedPage[1];
       console.log(`Found ${hits} links to the page ${url}`)
   }
   console.log('=================')
   console.log('END REPORT')
   console.log('=================')
}


function sortPages(pages){
   const pagesArr = Object.entries(pages)
   pagesArr.sort((a,b)=>{
       ahits = a[1];
       bhits = b[1];
       return b[1] - a[1]; // if result is positive then b comes before a and vice versa
   })
   return pagesArr
}

module.exports = {
  sortPages,
  printReport
}