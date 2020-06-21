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
        draft: Joi.boolean().required(),
        body: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
};

//----------GET REQUESTS-----------
app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/courses', (req, res) => {
    Course.find( {},function (err, doc) {
        if (err) return console.log(err);
        res.send(doc);
    });
});

app.get('/courses/:title', (req, res) => {
    Course.exists({title: req.params.title}, function (err, result){
        if (err) {
            return res.send(err);
        };
        if (result === false) {
            return res.status(404).send('The course with the given title was not found');
        };
        Course.findOne({title: req.params.title}, 'title draft body', function (err, doc) {
            if (err) return console.log(err);
            res.send(['TITLE:' + doc.title, 'DRAFT:'+doc.draft, 'BODY:' + doc.body]);
        });   
    });
});

//-----------POST REQUESTS--------------
app.post('/courses/newCourse/:title', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    Course.exists({title: req.params.title}, function (err, result){
        if (err) return res.send(err);
        
        if (result === true) return res.status(404).send('A course with the given title already exists, please change your title.');
        const clean = sanitizeHtml(req.body.body);
        const cleanString = String(clean);

        functions.saveNewCourse(req.params.title, req.body.draft, cleanString);
        res.send('success');
    });    
});

//-----------PUT REQUESTS--------------
app.put('/courses/updateBody/:title', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    Course.exists({title: req.params.title}, function (err, result){
        if (err) return res.send(err);
        
        if (result === false) return res.status(404).send('The course with the given title was not found');

        Course.findOneAndUpdate({title: req.params.title}, {body: req.body.body}, function (error, doc){
            if (error) return res.send(error);
            res.send('success');
        });
    });
});

app.put('/courses/updateDraft/:title', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    Course.exists({title: req.params.title}, function (err, result){
        if (err) {
            return res.send(err);
        };
        if (result === false) {
            return res.status(404).send('The course with the given title was not found');
        };
        Course.findOneAndUpdate({title: req.params.title}, {draft: req.body.draft}, function (error, doc){
            if (error) return res.send(error);
            res.send('success');
        });
    });
});

//------------DELETE REQUESTS------------
app.delete('/courses/delete/:title', (req, res) => {
    Course.exists({title: req.params.title}, function (err, result){
        if (err) {
            return res.send(err);
        };
        if (result === false) {
            return res.status(404).send('The course with the given title was not found');
        };
        Course.findOneAndDelete({title: req.params.title});
        res.send('success');
    });
});

//-------------LOCAL CONNECTION------------
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('listening on port ' + port);
});
