const Course = require('../Schemas/course.js');

const Connect = require('../functionsDB.js');
Connect;

Course.deleteMany({});
console.log('All courses deleted');