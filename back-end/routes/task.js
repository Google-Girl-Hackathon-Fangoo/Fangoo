var express = require('express');
var router = express.Router();

var connection = require('./database.js');

router.use((req, res, next) => {
  //  console.log('Success Time: ', Date.now())
  next()
})

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

// get tasks done on someday
router.post('/querydone', function(req, res){
    console.log(req.body);
    data = req.body.data;
    console.log(data.username, data.date);
    stTime = data.date + " 00:00";
    edTime = data.date + " 23:59:59";
    console.log(stTime + ", "+ edTime);
    connection.query(
        "select * from task where userName = ? and endTime between ? and ? and finish = 1 order by endTime desc",
        [data.username, stTime, edTime],
        function (error, results, fields) {
            if(error)
                res.json({msg: error});
            else
                res.json(results);
        }
    );
});

// get tasks arranged on someday
router.post('/querydaily', function(req, res){
  console.log(req.body);
  data = req.body.data;
  console.log(data.username, data.date);
  stTime = data.date + " 00:00";
  edTime = data.date + " 23:59:59";
  console.log(stTime + ", "+ edTime);
  connection.query(
      "select * from task where userName = ? and startTime between ? and ? order by startTime desc",
      [data.username, stTime, edTime],
      function (error, results, fields) {
          if(error)
              res.json({msg: error});
          else
              res.json(results);
      }
  );
});

// get tasks almost missed on someday
router.post('/queryday', function(req, res){
  console.log(req.body);
  data = req.body.data;
  console.log(data.username, data.date);
  stTime = data.date + " 00:00";
  edTime = data.date + " 23:59:59";
  console.log(stTime + ", "+ edTime);
  connection.query(
      "select * from task where userName = ? and finish = 0 and deadline between ? and ? order by startTime desc",
      [data.username, stTime, edTime],
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
    "update task set startTime = ? where userName = ? and title = ?", [data.date, data.username, data.title],
    function(error, results, fields) {
      if (error) res.json({msg: error})
    }
  )
  res.json({ msg: 'success'})
});

module.exports = router