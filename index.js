var express = require('express');
var Sequelize = require('sequelize');
var app = express();

app.set('Views', '/views');
app.set('view engine', 'pug');

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
    message: 'Teste'
  });
});

//server
app.listen(3000, '127.0.0.1', function(){
  console.log('started');
});
