
var url = require('url'),
http = require('http'),
qs = require('querystring');
var resolveUrl = require("resolve-url")
const cheerio = require("cheerio"),req = require("tinyreq");
const querystring = require('querystring');
var fs = require('fs');
var async = require('async');


http.createServer(function(req,res){
    
        var url_parts = url.parse(req.url,true);
        var dataUrl = url_parts.query.url;
        console.log(dataUrl);
        var urllists = [];
        dataUrl.forEach(function(urlindex){urllists.push(urlindex);});
        urllists.forEach(function(item){item = "https://"+url.parse(item).hostname;});
        async.concat(urllists , scrape, function (err , results){console.log(results);
                                                                  res.writeHead(200, {"Content-Type": "application/json"});
                                                                  var json = JSON.stringify({ Titles: results
                                                                    });
                                                                res.end(json)});
    
}).listen ( 8080 , "127.0.0.1");

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



