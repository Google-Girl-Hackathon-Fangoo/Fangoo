var express = require('express');
var router = express.Router();
var crypto = require('./md5.js');

var connection = require('./database.js');
/* GET users listing. */


router.use((req, res, next) => {
  //  console.log('Success Time: ', Date.now())
  next()
})

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.password, data.nickname)
  connection.query(
    "SELECT * FROM USERS WHERE username = ?", data.username,
    function(error, results, fields) {
      if (error) res.json({msg: error})
      console.log(results)
      console.log(results[0])
      if (results[0] === undefined){
        console.log(data.username, data.password, data.nickname)
        pwd = crypto.md5(data.password)
        console.log(pwd)
        connection.query(
          "INSERT INTO users(username, password, nickname) VALUES(?, ?, ?)", [data.username, pwd, data.nickname],
          function(error, results, fields) {
            if (error) res.json({msg: error})
          }
        )
        res.json({ msg: 'success'})
      } else {
        res.json({
          msg: 'username is used'
        })
      }
    }
  )
})

router.post('/login', (req, res) => {
  console.log(req.body)
  console.log(req.body.data.username)
  data = req.body.data
  connection.query(
    "SELECT password FROM USERS WHERE username = ?", data.username,
    function(error, results, fields) {
      if (error) res.json({msg: error})
      console.log(results)
      console.log(results[0])
      if (results[0] === undefined){
        res.json({msg: 'fail'})
      } else if (results[0].password == crypto.md5(data.password)){
        res.json({msg: 'success'})
      } else{
        res.json({msg: 'fail'})
      }
    }
  )
})

router.get('/test', (req, res) => {
  connection.query(
    "SELECT * FROM USERS",
    function(error, results, fields) {
      if (error) res.json({msg: error})
      res.json(results);
    }
  );
});

module.exports = router