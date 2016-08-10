var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

//defining template engine
app.set('Views', '/views');
app.set('view engine', 'pug');
//data parse to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//method-override
app.use(methodOverride(function(req, res){
  if(req.body && typeof req.body == 'object' && '_method' in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//database connection
var sequelize = new Sequelize('mysql://root:root@localhost:3306/expressjs');

//database entity
var Courses = sequelize.define('courses', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.TEXT,
    teacher: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//database migration
Courses.sync().then(function(){
    return Courses.create({
        name: 'Teste',
        description: 'Testando o ORM',
        teacher: 'Vitor Barros'
    })
});

//routes
app.get('/courses', function(req, res){
Courses
    .findAll()
    .then(function(result){
        res.render('courses',{
            data:result,
            message: 'List of courses'
        });
    })
    .catch(function(err){
        console.log(err);
    })
});
app.get('/courses/create', function(req, res){
    res.render('new_course', {
        message: 'Create a new Course'
    });
});
app.post('/courses/create', function(req, res){
    Courses
      .create(req.body)
      .then(function(){
        res.render('new_course', {
          message:'The course has been created'
        });
      })
      .catch(function(err){
        console.log(err);
      });
});
app.delete('/courses/:id', function(req, res){
  Courses
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(){
      res.redirect('/courses/');
    })
    .catch(function(err){
      console.log(err);
    });
});
app.get('/courses/edit/:id', function(req,res){
  Courses
    .findById(req.params.id)
    .then(function(result){
      res.render('edit_courses',{
        message: 'Edit course ' + req.params.id,
        data: result
      });
    })
    .catch(function(err){
      console.log(err);
    });
});
app.put('/courses/edit/:id', function(req, res){
  Courses
    .update(req.body, {
      where:{
        id: req.params.id
      }
    })
    .then(function(){
        res.redirect('/courses/');
    })
    .catch(function(err){
      console.log(err);
    });
});
app.get('/courses/:id', function(req, res){
Courses
    //by id
    .findById(req.params.id)
    .then(function(result){
        res.render('courses', {
            data:[result],
            message: 'One Course'
        });
    })
    .catch(function(err){
        console.log(err);
    });
    //by where
    // .findOne({
    //     where: {
    //         id: req.params.id
    //     }
    // })
    // .then(function(result){
    //     res.render('courses', {
    //         data:[result],
    //         message: 'One Course'
    //     });
    // })
    // .catch(function(err){
    //     console.log(err);
    // });
});
app.get('/', function(req, res){
  res.render('index', {
    message: 'Teste',
    count: 5
  });
});
//server
app.listen(3000, '127.0.0.1', function(){
  console.log('started');
});
