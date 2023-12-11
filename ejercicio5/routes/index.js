const express = require('express');
const router = express.Router();
const session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user:req.session.user});
});

module.exports = router;
