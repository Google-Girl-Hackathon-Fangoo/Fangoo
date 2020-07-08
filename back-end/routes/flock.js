var express = require('express');
var router = express.Router();
var flockNum = 0

var connection = require('./database.js');

router.use((req, res, next) => {
  //  console.log('Success Time: ', Date.now())
  next()
})

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/addflock', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.title)
  flockNum = flockNum + 1
  connection.query(
    "insert into flock values(?, ?, ?)", [flockNum, data.username, data.title],
    function(error, results, fields) {
      if (error) res.json({msg: error})
      else {
        connection.query(
          "insert into flockUser values(?, ?, 1)", [data.username, flockNum],
          function(error, results, fields) {
            if (error) res.json({msg: error})
          }
        )
      }
    }
  )
  res.json({ msg: 'success'})
})

module.exports = router