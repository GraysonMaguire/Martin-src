const mongoose = require('mongoose');
const Course = require('./Schemas/course.js');

//-------CONNECT-------
const pswd = 'martin12';
const dbname = 'tys';
const url = 'mongodb+srv://mrTin:'+pswd+'@tys-yymmf.gcp.mongodb.net/'+dbname+'?retryWrites=true&w=majority'
const db = mongoose.connection

exports.connectDb = function connectDb() {
    mongoose.connect(url , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    db.once('open', () => {
        console.log('Database connected:', url)
    });
    
    db.on('error', err => {
        console.error('connection error:', err)
    });
};

//-------NEW COURSE-----------
exports.saveNewCourse = function saveNewCourse(Title,Body) {
    const newCourse = new Course({
        title: Title,
        body: Body
    });

    newCourse.save(function (error, document) {
        if (error) return console.error(error)
        console.log(document)
    });

};

//-------FIND FUNCTIONS-------
exports.findOne = function findOneCourse(Title) {
    Course.findOne({title: Title}, 'title body', function (err, doc) {
        if (err) return console.log(err);
        const content = [ doc.title, doc.body ];
    
        //return content;
    });  
};

exports.find = function findCourse() {
    Course.find( {},function (err, doc) {
        if (err) return console.log(err);
        res.send(doc);
    });  
};


