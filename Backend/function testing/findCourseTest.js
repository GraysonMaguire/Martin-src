const functions = require('../functionsDB.js');

functions.connectDb();

//console.log(functions.find());

console.log(functions.findOne('html test').content);
//const [first, second] = result;
//console.log(first, second);
