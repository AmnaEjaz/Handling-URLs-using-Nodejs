
var url = require('url'),
http = require('http'),
qs = require('querystring');
var resolveUrl = require("resolve-url")
const cheerio = require("cheerio"),req = require("tinyreq");
const querystring = require('querystring');
var fs = require('fs');

http.createServer(function(req,res){
    var titles =[], final, count = 0;
    res.writeHead(200, {"Content-Type": "text/plain"});
    
    
    urlstyped(req.url , function(url){
        var count = 0,alltitles = [];
        console.log(url);
        
        getTitles( url , function(titles){ 
                                           ++count;
                                         
                                           alltitles.push(titles);
            
                                           if(count == url.length){  
                                        
                                            final = alltitles;
                                               console.log(final);
                                               fs.writeFileSync('myOutput.txt', final);
                                               fs.readFile('myOutput.txt', function (err, html) {
                                                    if (err) {
                                                        throw err; 
                                                    }       
                                                    
                                                        res.writeHeader(200, {"Content-Type": "text/html"}); 
                                                        res.write("the URLs typed are --->  " + url + "\n The titles of the URLs are --->  ");
                                                        res.write(html);  
                                                        res.end();
                                                   
                                                });                                             
                                                
                                  
                                           }
                                            
                                          });
        
       })
}).listen(8081 , "127.0.0.1");


    
    function urlstyped(data , cb){
    
        var url_parts = url.parse(data,true);
        var dataUrl = url_parts.query.url;
        var urllist = [];
        dataUrl.forEach(function(urlindex){urllist.push(urlindex);});
        urllist.forEach(function(item){item = "https://"+url.parse(item).hostname;console.log(item);}) 
        cb(urllist);
  }
    
   function getTitles(data , cb){
        data.forEach(function(item , index ){
          scrape( item , (function(err , data){
                cb(data);
                 })); 
           })
    }
    

function scrape(urlthis , cb) {
    
    // 1. Create the request
   req(urlthis, (err, body) => {
      if (err) { return err; }

        // 2. Parse the HTML
        let $ = cheerio.load(body);

        // 3. Extract the data
       var title = $('title').text();
       
       return cb(null,title);
    
       
       
    });
    
}



