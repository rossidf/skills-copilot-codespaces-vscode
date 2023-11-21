// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create web server object
var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    
    // Check URL and process
    if(resource == '/create'){
        // Process POST request
        if(request.method == 'POST'){
            create(request, response);
        }
        // Process GET request
        else{
            fs.readFile('create.html', 'utf-8', function(error, data){
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(data);
            });
        }
    }
    else if(resource == '/list'){
        // Process GET request
        if(request.method == 'GET'){
            list(request, response);
        }
        // Process POST request
        else{
            console.log('GET method is not supported.');
        }
    }
    else{
        console.log('Invalid URL');
    }
});

// Listen web server
server.listen(8080, function(){
    console.log('Server is running...');
});

// Create comment
function create(request, response){
    // Read POST data
    request.on('data', function(data){
        var body = data.toString();
        var post = qs.parse(body);
        var name = post.name;
        var comment = post.comment;
        
        // Save file
        fs.appendFile('comment.txt', name+':'+comment+'\n', 'utf-8', function(error){
            response.writeHead(302, {'Location':'/list'});
            response.end();
        });
    });
}

// List comment
function list(request, response){
    // Read file
    fs.readFile('comment.txt', 'utf-8', function(error, data){
        response.writeHead(200, {'Content-Type':'text/html'});
        
        // Split data by line
        var dataArray = data.split('\n');
        var tr = '';
        for(var i in dataArray){
            var item = dataArray[i].split(':');
            tr += '<tr><td>'+item[0]+'</td><td>'+item[1]+'</td></tr>';
        }
        
        // Create table
        var html = fs.readFileSync('list.html', 'utf-8');
        html = html.replace('#tbody', tr);
        response.end(html);
    });
}