var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var tokenKey = "fintechAcademy0$1#0@6!2"

var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'lucifer247',             // CHANGE!
	database : 'kisa',
	port     : '3306' //8886
  });
   
  connection.connect();

/* GET home page. */
router.get('/', function (req, res) {
	res.render('login');
})

router.post('/', function (req, res) {
	var id = req.body.id;
	var userPassword = req.body.password;
	var sql = "SELECT * FROM user WHERE id = ?";
	connection.query(sql, [id], function (error, results, fields) {
		if (error) throw error;
    console.log(results.length);
    if(results.length == 0){
      res.json(3)
    }
    else{
      if (results[0].password == userPassword) {
        jwt.sign(
          {
            userId: results[0].id
          },
          tokenKey,
          {
            expiresIn: '90d',
            issuer: 'fintech.admin',
            subject: 'user.login.info'
          },
          function (err, token) {
            console.log('로그인 성공', token)
            res.json(token)
          }
        )
      }
      else {
        console.log('비밀번호 틀렸습니다.');
        res.json(0);
      }
  
    }
	});
})

module.exports = router;