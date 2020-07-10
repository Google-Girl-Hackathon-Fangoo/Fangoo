var express = require('express');
var router = express.Router();

var connection = require('./database.js');
/* GET users listing. */


router.use((req, res, next) => {
  next()
})

// add a sign in
router.post('/add', (req, res) => {
  data = req.body.data
  connection.query(
    "INSERT INTO signType(flockId, beginTime, endTime, description) VALUES(?, ?, ?, ?)", [data.flockId, data.beginTime, data.endTime, data.description],
    function(error, results, fields){
      if (error) res.json({msg: error})
      else res.json({msg: 'success'})
    }
  )
})

// a person signed in in a flock
router.post('/done', (req, res) => {
  data = req.body.data
  getTime = new Date()
  connection.query(
    "SELECT * FROM signType WHERE flockId = ? ORDER BY endTime DESC", data.flockId,
    function(error, results, fields){
//      console.log(results[0])
//      console.log(results[0].beginTime, getTime, results[0].endTime)
      if (results[0] === undefined) res.json({msg: 'fail'})
      else if (results[0].beginTime <= getTime && getTime <= results[0].endTime){
        connection.query(
          "INSERT INTO signRecord(username, flockId, getTime) VALUES(?, ?, ?)", [data.username, data.flockId, getTime],
          function(error, results, fields) {
              if (error) res.json({msg: error})
              else res.json({msg: 'success'})
          }
        )
      } else res.json({msg: 'success'})
    }
  )
})

module.exports = router