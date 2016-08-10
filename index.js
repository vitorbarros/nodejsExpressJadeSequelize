var express = require('express');
var app = express();

app.set('Views', '/views');
app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.render('index', {
    message: 'Teste',
    count: 5
  });
});

app.listen(3000, '127.0.0.1', function(){
  console.log('started');
});
