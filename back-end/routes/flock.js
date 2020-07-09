var express = require('express');
var router = express.Router();

var connection = require('./database.js');

router.use((req, res, next) => {
   next();
});

// create flock
router.post('/addflock', (req, res) => {
    console.log(req.body);
    data = req.body.data;
    console.log(data.username, data.title);
    connection.query(
        "insert into flock(adminName, flockName) values (?, ?)",
        [data.username, data.title],
        function (error, results, fields) {
            if(error)
                res.json({msg: error});
            else
            {
                connection.query(
                    "select flockId from flock where adminName= ? and flockName = ?",
                    [data.username, data.title],
                    function (error, results,fields) {
                        if(error)
                            res.json({msg: error});
                        else
                        {
                            flockNum = results[0].flockId;
                            connection.query(
                                "insert into flockUser values(?, ?, 1)",
                                [data.username, flockNum],
                                function (error, results,fields) {
                                    if(error)
                                        res.json({msg: error});
                                    else
                                        res.json({msg: 'success'});
                                }
                            );
                        }
                    }
                );

            }
        }
    );
});

router.post('/adduser', (req, res) => {
    console.log(req.body)
    data = req.body.data
    console.log(data.username, data.flockid)
    connection.query(
      "insert into flockUser values(?, ?, 0)", [data.username, data.flockid],
      function(error, results, fields) {
        if (error) res.json({msg: error})
      }
    )
    res.json({ msg: 'success'})
  })
  
router.post('/deluser', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.flockid)
  connection.query(
    "delete from flockUser where usersName = ? and flockId = ?", [data.username, data.flockid],
    function(error, results, fields) {
      if (error) res.json({msg: error})
    }
  )
  res.json({ msg: 'success'})
})

module.exports = router;





