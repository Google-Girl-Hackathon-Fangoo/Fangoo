var express = require('express');
var router = express.Router();
var crypto = require('./md5.js');
var verify = require('./verify.js');
var mailer = require('./mailer.js');

var connection = require('./database.js');
/* GET users listing. */


router.use((req, res, next) => {
  next()
})

// check whether the username is used
router.post('/checkUsername', (req, res) => {
  data = req.body.data
  connection.query(
    "SELECT * FROM users WHERE username = ?", data.username,
    function(error, results, fields) {
      if (results[0] === undefined) res.json({msg: 'success'})
      else res.json({msg: 'failed'})
    }
  )
})

// send register captcha to the user
router.post('/captcha', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.email, data.email)
  captcha = verify.generate(6)
  mailer.send(data.email, captcha)
  getTime = new Date()
  if (data.email === undefined) res.json({msg: 'email is required'})
  else{
    connection.query(
      "INSERT INTO CAPTCHA(email, captcha, getTime) VALUES(?, ?, ?)", [data.email, captcha, getTime],
      function(error, results, fields) {
        if (error) res.json({msg: error})
        else res.json({msg:'success'})
      }
    )
  }
})

router.post('/register', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.password, data.email, data.captcha)
  /*connection.query(
    "SELECT * FROM USERS WHERE username = ?", data.username,
    function(error, results, fields) {
      if (error) res.json({msg: error})
      console.log(results)
      console.log(results[0])
      if (results[0] === undefined){
        console.log(data.username, data.password)*/
  connection.query(
    "SELECT * FROM captcha WHERE email = ?", data.email,
    function (error, results, fields){
        pwd = crypto.md5(data.password)
        console.log(pwd)
        console.log(results[0])
        getTime = new Date()
        if (results[0] === undefined) res.json({msg: 'fail'})
        else if (results[0].captcha !== data.captcha) res.json({msg: 'fail'})
        else if (results[0].getTime - getTime <= 600){
          connection.query(
            "DELETE FROM captcha WHERE email = ? ", [data.email],
            function(error, results, fields) {
              if (error) res.json({msg: error})
              else {
                connection.query(
                  "INSERT INTO users(username, password, email) VALUES(?, ?, ?)", [data.username, pwd, data.email],
                  function(error, results, fields) {
                    if (error) res.json({msg: error})
                    else res.json({msg:'success'})
                  }
                )
              }
            }
          )
        }
    }
  )
})
        /*res.json({ msg: 'success'})
      } else {
        res.json({
          msg: 'username is used'
        })
      }
    }
  )
})*/

router.post('/login', (req, res) => {
  console.log(req.body)
  console.log(req.body.data.username)
  data = req.body.data
  connection.query(
    "SELECT password FROM users WHERE username = ?", data.username,
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

// test module --- get all the information from the table `users`
router.post('/test', (req, res) => {
  connection.query(
    "SELECT * FROM users",
    function(error, results, fields) {
      if (error) res.json({msg: error})
      res.json(results);
    }
  );
});

module.exports = router