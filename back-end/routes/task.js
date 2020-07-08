var express = require('express');
var router = express.Router();

var connection = require('./database.js');

router.use((req, res, next) => {
  //  console.log('Success Time: ', Date.now())
  next()
})

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/insert', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.title, data.deadline, data.description)
  connection.query(
    "insert into task(users_name, task_name, explain, deadline, finish) values(?, ?, ?, ?, 0)", [data.username, data.title, data.description, data.deadline],
    function(error, results, fields) {
      if (error) res.json({msg: error})
    }
  )
  res.json({ msg: 'success'})
})

router.post('/update', (req, res) => {
    console.log(req.body)
    data = req.body.data
    console.log(data.username, data.title)
    getTime = new Date()
    connection.query(
      "update task set end_time = ?, finish = 1 where user_name = ? and title = ?", [getTime, data.username, data.title],
      function(error, results, fields) {
        if (error) res.json({msg: error})
      }
    )
    res.json({ msg: 'success'})
})

router.post('/delete', (req, res) => {
    console.log(req.body)
    data = req.body.data
    console.log(data.username, data.title)
    connection.query(
      "delete from task where user_name = ? and title = ?", [data.username, data.title],
      function(error, results, fields) {
        if (error) res.json({msg: error})
      }
    )
    res.json({ msg: 'success'})
})

router.post('/queryday', (req, res) => {
    console.log(req.body)
    data = req.body.data
    console.log(data.username, data.date, data.type)
    connection.query(
      "SELECT * FROM task WHERE username = ? and deadline = ? and finish = ?", [data.username, data.date, data.type],
      function(error, results, fields) {
        if (error) res.json({msg: error})
        console.log(results)
        res.json(results)
      }
    )
})

router.post('/queryflock', (req, res) => {
    console.log(req.body)
    data = req.body.data
    console.log(data.flockid, data.date)
    connection.query(
      "SELECT * FROM task WHERE flock_id = ? and deadline = ?", [data.flockid, data.date],
      function(error, results, fields) {
        if (error) res.json({msg: error})
        console.log(results)
        res.json(results)
      }
    )
})

module.exports = router