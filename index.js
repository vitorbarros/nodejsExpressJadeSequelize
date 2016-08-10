var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var app = express();

app.set('Views', '/views');
app.set('view engine', 'pug');
//11.32
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    console.log(req.body);
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
