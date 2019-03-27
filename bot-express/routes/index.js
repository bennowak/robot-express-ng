var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(
      'index',
      {
        title: 'Robot Challenge',
        body: 'Welcome to Robot Challenge API.  Please consume the endpoints to retrieve data and power applications.'
      }
    );
});

module.exports = router;
