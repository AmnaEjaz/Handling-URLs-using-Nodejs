
var url = require('url'),
http = require('http'),
qs = require('querystring');
var resolveUrl = require("resolve-url")
const cheerio = require("cheerio"),req = require("tinyreq");
const querystring = require('querystring');
var fs = require('fs');
var promise = require('promise');


http.createServer(function(req,res){
    
    //get url done
    // make url list done
    //send list one by one to run scrap function
    // get result from scrape
    //make final list of all titles
    //store in file
    //show file

    
        var url_parts = url.parse(req.url,true);
        var dataUrl = url_parts.query.url;
        var urllist = [];
        var titlesnew = [];
        dataUrl.forEach(function(urlindex){urllist.push(urlindex);});
        urllist.forEach(function(item){item = "https://"+url.parse(item).hostname;});
        urllist.forEach(function(item){
            scrape(item).then(function(results){ titlesnew.push(results); 
                                                console.log("finally"+ titlesnew);
                                               if(titlesnew.length == urllist.length){
                                               fs.writeFileSync('myOutputtask2.txt', titlesnew);
                                               fs.readFile('myOutputtask2.txt', function (err, html) {
                                                    if (err) {
                                                        throw err; 
                                                    }       
                                                        res.writeHeader(200, {"Content-Type": "text/html"}); 
                                                        res.write("The titles of the URLs are --->  ");
                                                        res.write(html);  
                                                        res.end();
                                                   
                                                }); 
                                               }});
        });
}).listen ( 8080 , "127.0.0.1");


function scrape(urlthis) {

    
      return new Promise(
        function (resolve, reject) {
    
                         
         // 1. Create the request
        req(urlthis, (err, body) => {
        if (err) { return err; }

        // 2. Parse the HTML
        let $ = cheerio.load(body);

        // 3. Extract the data
        var title = $('title').text();
          console.log("inside scrape -> "+title);
            
          success: resolve(title);
          error: reject(Error);
      });
          
    });
}


