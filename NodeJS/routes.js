const fs = require('fs'); 



const requestHandler = (req, res) => {
const url = req.url;
const method = req.method;
    
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST" ><input type="text" name="message"><button type="submit">Click</button></form></body>');
        res.write('</html>');
       return res.end();
    }
    if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', function(chunk){
    body.push(chunk);
    console.log(chunk);
    });
    return req.on('end',function(){
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[1];
    fs.writeFile('message.txt', message, function(err){
    
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
    });
    });
    
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head></head>');
    res.write('<body><h1>Hello there</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;

module.exports = {
    
}


