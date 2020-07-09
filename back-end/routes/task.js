var express = require('express');
var router = express.Router();

var connection = require('./database.js');

router.use(function(req, res, next) {
    next();
});

// personal create flock task
router.post('/insert', function(req, res) {
   console.log(req.body);
   data = req.body.data;
   console.log(data.username, data.title, data.deadline, data.description);
   connection.query(
       "insert into task(userName, taskName, `explain`, deadline) values(?, ?, ?, ?)",
       [data.username, data.title, data.description, data.deadline],
       function (error, results, fields) {
            if(error)
                res.json({msg: error});
            else
                res.json({msg: 'success'});
       }
   );
});

// set end time, finish a task
router.post('/update', function(req, res){
    console.log(req.body);
    data = req.body.data;
    console.log(data.username, data.title, data.deadline);
    getTime = new Date();
    connection.query(
        "update task set endTime = ?, finish = 1 where userName = ? and taskName = ? and deadline = ?",
        [getTime, data.username, data.title, data.deadline],
        function (error, results, fields) {
            if(error)
                res.json({msg: error});
            else
                res.json({msg: 'success'});
        }
    );
});

// remove personal task
router.post('/delete', function(req, res){
    console.log(req.body);
    data = req.body.data;
    console.log(data.username, data.title);
    connection.query(
        "delete from task where userName = ? and taskName = ? and deadline = ?",
        [data.username, data.title, data.deadline],
        function (error, results, fields) {
            if(error)
                res.json({msg: error});
            else
                res.json({msg: 'success'});
        }
    );
});

// get tasks on someday
router.post('/queryday', function(req, res){
    console.log(req.body);
    data = req.body.data;
    console.log(data.username, data.date, data.type);
    stTime = data.date + " 00:00";
    edTime = data.date + " 23:59:59";
    console.log(stTime + ", "+ edTime);
    connection.query(
        "select * from task where userName = ? and deadline between ? and ? and finish = ? order by deadline desc",
        [data.username, stTime, edTime, data.type],
        function (error, results, fields) {
            if(error)
                res.json({msg: error});
            else
                res.json(results);
        }
    );
});

// all members's ddls on someday in a flock
router.post('/queryflock', function (req, res) {
    console.log(req.body);
    data = req.body.data;
    console.log(data.flockid, data.date);
    stTime = data.date + " 00:00";
    edTime = data.date + " 23:59:59";
    connection.query(
        "select * from task where flockId = ? and deadline between ? and ?",
        [data.flockid, stTime, edTime],
        function (error, results, fields) {
            if(error)
                res.json({msg: error});
            else
                res.json(results);
        }
    );
});

// set start time
router.post('/arrange', (req, res) => {
    console.log(req.body)
    data = req.body.data
    console.log(data.username, data.title, data.date)
    connection.query(
        "update task set startTime = ? where userName = ? and taskName = ? and deadline = ?",
        [data.date, data.username, data.title, data.deadline],
        function(error, results, fields) {
            if (error)
                res.json({msg: error});
            else
                res.json({ msg: 'success'});
        }
    )
});

module.exports = router;
