var express = require('express');
var router = express.Router();

var connection = require('./database.js')
/* GET users listing. */


router.use((req, res, next) => {
  //  console.log('Success Time: ', Date.now())
  next()
})

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/login', (req, res) => {
  console.log(req.body)
  console.log(req.body.data.username)
  connection.query(
    "SELECT password FROM USERS WHERE username = ?", req.body.data.username,
    function(error, results, fields) {
      if (error) throw error;
      console.log(results)
      console.log(results[0])
      if (results[0] === undefined){
        res.json({msg: 'fail'})
      } else if (results[0].password == req.body.data.password){
        res.json({
          msg: 'success'
        })
      } else{
        res.json({
          msg: 'fail'
        })
      }
    }
  )
})

router.get('/test', (req, res) => {
  connection.query(
    "SELECT * FROM USERS",
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

module.exports = router