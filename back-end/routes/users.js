var express = require('express');
var router = express.Router();
var connection = require('./database.js');
var crypto = require('./md5.js');
var mailer = require('./mailer.js');
var verify = require('./verify');
var flockRouter = require('./flock');
var taskRouter = require('./task');

router.use((req, res, next) => {
  next();
})

// check whether the username is used
router.post('/checkUsername', (req, res) => {
  data = req.body.data;
  connection.query(
      "select * from users where username = ?",
      data.username,
      function (error, results, fields) {
        if(results[0] === undefined)
          res.json({msg: 'success'});
        else
          res.json({msg: 'failed'});
      }
  )
});


// send register captcha to the user
router.post('/captcha', (req, res) => {
  console.log(req.body);
  data = req.body.data;
  console.log(data.email);
  captcha = verify.generate(6);
  mailer.send(data.email, captcha);
  getTime = new Date();
  if(data.email === undefined)
      res.json({msg: 'email is required'});
  else
  {
      // 可以后续加上定时删除无效数据
      connection.query(
          "insert into captcha(email, captcha, getTime) values (?, ?, ?)",
          [data.email, captcha, getTime],
          function (error, results, fields) {
            if(error)
                res.json({msg: error});
            else
                res.json({msg: 'success'});
          }
      )
  }
});

// register
router.post('/register', (req, res) => {
    console.log(req.body);
    data = req.body.data;
    console.log(data.username, data.password, data.email, data.captcha)
    connection.query(
        "select * from captcha where email = ? order by getTime desc",
        data.email,
        function (error, results, fields) {
            pwd = crypto.md5(data.password);
            console.log(pwd);
            console.log(results[0]);
            getTime = new Date();
            if(results[0] === undefined)
                res.json({msg: 'fail'});
            else if(results[0].captcha !== data.captcha)
                res.json({msg: 'fail'});
            else if(getTime - results[0].getTime  <= 600000) // 600000 ms = 10 min
            {
                connection.query(
                    "delete from captcha where email = ?",
                    data.email,
                    function (error, results, fields) {
                        if(error)
                            res.json({msg: error});
                        else
                        {
                            connection.query(
                                "insert into users(username, password, email) values(?, ?, ?)",
                                [data.username, pwd, data.email],
                                function (error, results, fields) {
                                    if(error)
                                        res.json({msg: error});
                                    else
                                        res.json({msg: 'success'});
                                }
                            )
                        }


                    }
                )
            }
            else // 10 min ago
            {
                connection.query(
                    "delete from captcha where email = ?",
                    data.email,
                    function (error, results, fields) {
                        if (error)
                            res.json({msg: error});
                        else
                            res.json({msg: 'success'});
                    })
            }
        }
    )
});

// login
router.post('/login', (req, res) => {
   console.log(req.body);
   console.log(req.body.data.username);
   data = req.body.data;
   connection.query(
       "select password from users where username = ?",
       data.username,
       function (error, results, fields) {
        if(error)
            res.json({msg: error});
        else
        {
            console.log(results);
            console.log(results[0]);
            if(results[0] === undefined)
                res.json({msg: 'fail'});
            else if(results[0].password === crypto.md5(data.password))
                res.json({msg: 'success'});
            else
                res.json({msg: 'fail'});
        }

       }
   );
});

// flock CRUD
router.use('/', flockRouter);

// create personal task
router.use('/personaltask', taskRouter);

// test module
router.post('/test', function (req, res) {
  connection.query(
      "select * from users",
      function (error, results, fields) {
        if(error)
          res.json({msg: error});
        else
          res.json(results);
      }
  )
})


module.exports = router;
