const express = require('express');

const router = express.Router();

router.use('/', function(req, res, next) {
    res.render(
        'index',
        {
            title: 'Robot Challenge API Documentation',
            body: 'This Area is under construction'
        }
    );
})

module.exports = router;
