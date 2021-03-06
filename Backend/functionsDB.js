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
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    db.once('open', () => {
        console.log('Database connected:', url)
    });
    
    db.on('error', err => {
        console.error('connection error:', err)
    });
};

//-------NEW COURSE-----------
exports.saveNewCourse = function saveNewCourse(Title,Draft, Body) {
    const newCourse = new Course({
        title: Title,
        draft: Draft,
        body: Body
    });

    newCourse.save(function (error, document) {
        if (error) return console.error(error)
        console.log(document)
    });

};


