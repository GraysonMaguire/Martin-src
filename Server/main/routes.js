var express = require("express");

var router = express.Router();

router.get("/api/hello", function (req, res) {
  res.json("hello world-from server"); //this is initial Api being called
});
router.get("/api/Courses", function (req, res) {
  res.redirect("https://jsonplaceholder.typicode.com/posts"); //this is initial Api being called
});
router.post("/api/Courses", function (req, res) {
  res.redirect("https://jsonplaceholder.typicode.com/posts"); //this is initial Api being called
});

module.exports = router;
