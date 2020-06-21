const functions = require('../functionsDB.js');
const sanitizeHtml = require('sanitize-html');

const testCourseBody = `<p>this is a test</p> <p>&nbsp;</p> <p><em>testestestestestestestest</em></p> <p>&nbsp;</p> <ul> <li><em>one</em></li> <li><em>two</em></li> <li>three</li> </ul>`;
const clean = sanitizeHtml(testCourseBody);
const cleanString = String(clean);

functions.connectDb();

//format: SaveNewCourse(Title,Body)
functions.saveNewCourse('html test 3', cleanString);
