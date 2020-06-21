const Joi = require('joi');
const express = require('express');
const app = express();
const sanitizeHtml = require('sanitize-html');

//const mongoose = require('mongoose');
const functions = require('./functionsDB.js');
const Course = require('./Schemas/course.js');

functions.connectDb();

app.use(express.json());

//-----------VALIDATION-------------
function validateCourse(course) {
    const schema = {
        title: Joi.string().min(3).required(),
        body: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
};

//----------GET REQUESTS-----------
app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/courses', (req, res) => {
    const courses = Course.find( {},function (err, doc) {
        if (err) return console.log(err);
        res.send(doc);
    });
});

app.get('/courses/:title', (req, res) => {
    Course.findOne({title: req.params.title}, 'title body', function (err, doc) {
        if (err) return console.log(err);
        res.send(doc);  
    });
});

//-----------POST REQUESTS--------------
app.post('/courses/newCourse/:title', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };
    
    const clean = sanitizeHtml(req.body.body);
    const cleanString = String(clean);

    functions.saveNewCourse(req.body.title, cleanString);
    res.send('success');

});

//-----------PUT REQUESTS--------------
app.put('/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));  
    if (!course) {
        return res.status(404).send('The course with the given id was not found')
    };

    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    course.name = req.body.name;
    res.send(course);

});

//------------DELETE REQUESTS------------
app.delete('/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));  
    if (!course) return res.status(404).send('The course with the given id was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

//-------------LOCAL CONNECTION------------
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('listening on port ' + port);
});