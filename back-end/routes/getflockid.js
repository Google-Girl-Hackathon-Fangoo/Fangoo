var express = require('express');
var router = express.Router();

var connection = require('./database.js');

router.use(function(req, res, next) {
    next();
});

router.post('/', function (req, res) {
    data = req.body.data;
    connection.query(
        "select flockid from flockUser where userName = ? and authorityType = ?",
        [data.userName, data.type],
        function (error, results, fields) {
            if(error)
                res.json({msg: error});
            else
                res.json(results);
        }
    );
});

module.exports = router;