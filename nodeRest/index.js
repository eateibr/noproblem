const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

// url: http://localhost:3000/
app.get('/', (request, response) => response.send('Performance Diff Tool'));

// all routes prefixed with /api
app.use('/api', router);

// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  //response.json({message: 'Hello, welcome to my server'});
  //var exec = require('child_process').exec;
  //var child = exec('java -jar logDiff.jar f1.out f2.out');
  
  var fs=require('fs');
  var data=fs.readFileSync('result_formated.json', 'utf8');
  var words=JSON.parse(data);
  var bodyparser=require('body-parser');
  console.log(words);
  response.json(words);
  response.statusCode = 200;
});

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

// all of the code from the previous section should be here
const url = require('url');

router.get('/stuff', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var myParam = parameters.myParam;
  // e.g. myVenues = 12;
  
  var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;
  
  response.json({message: myResponse});
});

