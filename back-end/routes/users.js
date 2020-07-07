var express = require('express');
var router = express.Router();
var crypto = require('./md5.js');
var verify = require('./verify.js');
var mailer = require('./mailer.js');

var connection = require('./database.js');
/* GET users listing. */


router.use((req, res, next) => {
  //  console.log('Success Time: ', Date.now())
  next()
})

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.poset('/captcha', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.email)
  captcha = verify.generate(6)
  mailer.send(data.email, captcha)
  getTime = new Date()
  connection.query(
    "INSERT INTO CAPTCHA(username, email, code, getTime) VALUES(?, ?, ?, ?)", [data.username, data.email, captcha, getTime],
    function(error, results, fields) {
      if (error) res.json({msg: error})
      else res.json({msg:'success'})
    }
  )
})

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
          "INSERT INTO users(username, password, nickname, email) VALUES(?, ?, ?)", [data.username, pwd, data.nickname, data.email],
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