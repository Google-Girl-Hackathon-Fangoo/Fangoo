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
                                        res.json({flockId: flockNum, msg: 'success'});
                                }
                            );
                        }
                    }
                );

            }
        }
    );
});

// add members
router.post('/adduser', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.searchid, data.flockid)
  connection.query(
    "select authorityType from flockUser where flockId = ? and userName = ?", [data.flockid, data.username],
    function(error, results, fields) {
      if (error) res.json({msg: error})
      else if (results[0] != 1)
        res.json({msg : 'failed because you are not admin'})
      else {
        connection.query(
          "insert into flockUser values(?, ?, 0)", [data.searchid, data.flockid],
          function(error, results, fields) {
            if (error) res.json({msg: error})
          }
        )
        res.json({ msg: 'success'})
      }
    }
  )
});

router.post('/deluser', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.searchid, data.flockid)
  connection.query(
    "select authorityType from flockUser where flockId = ? and userName = ?", [data.flockid, data.username],
    function(error, results, fields) {
      if (error) res.json({msg: error})
      else if (results[0] != 1)
        res.json({msg : 'failed because you are not admin'})
      else {
        connection.query(
          "delete from flockUser where userName = ? and flockId = ?", [data.searchid, data.flockid],
          function(error, results, fields) {
            if (error) res.json({msg: error})
          }
        )
        res.json({ msg: 'success'})
      }
    }
  )
})
  
router.post('/quit', (req, res) => {
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

// give authority to some members
router.post('/give', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.searchid, data.flockid)
  connection.query(
    "select authorityType from flockUser where flockId = ? and userName = ?", [data.flockid, data.username],
    function(error, results, fields) {
      if (error) res.json({msg: error})
      else if (results[0] == undefined)
        res.json({msg : 'failed because you are not admin'})
      else {
        connection.query(
          "update flockUser set authorityType = 1 where userName = ? and flockId = ?", [data.searchid, data.flockid],
          function(error, results, fields) {
            if (error) res.json({msg: error})
          }
        )
        res.json({ msg: 'success'})
      }
    }
  )
})

// drop authority of some members
router.post('/drop', (req, res) => {
  console.log(req.body)
  data = req.body.data
  console.log(data.username, data.searchid, data.flockid)
  connection.query(
    "select authorityType from flockUser where flockId = ? and userName = ?", [data.flockid, data.username],
    function(error, results, fields) {
      if (error) res.json({msg: error})
      else if (results[0] == undefined)
        res.json({msg : 'failed because you are not admin'})
      else {
        connection.query(
          "update flockUser set authorityType = 0 where userName = ? and flockId = ?", [data.searchid, data.flockid],
          function(error, results, fields) {
            if (error) res.json({msg: error})
          }
        )
        res.json({ msg: 'success'})
      }
    }
  )
})

// release flock announce
router.post('/addflockannounce', function (req, res) {
    data = req.body.data;
    connection.query(
        "select authorityType from flockUser where flockId = ? and userName = ?",
        [data.flockId, data.announcer],
        function (error, results, fields) {
            if (error)
                res.json({msg: error});
            else if(results[0].authorityType === 0)
                res.json({msg: 'no admin'});
            else
            {
                connection.query(
                    "select userName from flockUser where flockId = ?",
                    data.flockId,
                    function (error, results, fields) {
                        if (error)
                            res.json({msg: error});
                        else
                        {
                            flag = 0;
                            for(var i=0; i<results.length;i++)
                            {
                                connection.query(
                                    "insert into task(userName, taskName, `explain`, deadline, flockId) values(?, ?, ?, ?, ?)",
                                    [results[i].userName, data.title, data.description, data.deadline, data.flockId],
                                    function (error, results, fields) {
                                        if(error) {
                                            console.log(results[i]);
                                            res.json({msg: error});
                                            flag=1;
                                        }
                                    }
                                );
                                if(flag === 1)
                                    break;
                            }
                            if(flag === 0)
                                res.json({msg: 'success'});
                        }
                    }
                );
            }
        }
    );


});


module.exports = router;





