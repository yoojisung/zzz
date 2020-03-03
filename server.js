var express = require("express")
var request = require('request');
var jwt = require('jsonwebtoken');
var tokenKey = "fintechAcademy0$1#0@6!2"
var auth = require('./lib/auth');
var morgan = require('morgan');
var bodyParser = require('body-parser');


var indexRouter = require('./routers/index');
var signupRouter = require('./routers/signup');
var moreinfoRouter = require('./routers/moreinfo');
var depositRouter = require('./routers/deposit');
var loginRouter = require('./routers/login');
var forgotRouter = require('./routers/forgot');
var mainRouter = require('./routers/main');
var chargeRouter = require('./routers/charge');
var getPointRouter = require('./routers/getPoint');
var depositRefundRouter = require('./routers/depositRefund');
var mypageRouter = require('./routers/mypage');
var historyRouter = require('./routers/history'); 
var getallRouter = require('./routers/getall');
var finishedRouter = require('./routers/finished');
var getproRouter = require('./routers/getpro');
var testsolRouter = require('./routers/testsol');
app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));//public 폴더는 공개되는 것이기 때문에 디자인들을 올림
app.set('views', __dirname + '/views');//뷰파일 위치
app.set('view engine', 'ejs');//어떤 엔진을 사용하겠다.

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', indexRouter);
app.use('/', signupRouter);
app.use('/', moreinfoRouter);
app.use('/', depositRouter);
app.use('/', mypageRouter);
app.use('/login', loginRouter);
app.use('/forgot', forgotRouter);
app.use('/main', mainRouter);
app.use('/charge', chargeRouter);
app.use('/getPoint', getPointRouter);
app.use('/depositRefund', depositRefundRouter);
app.use('/history', historyRouter);
app.use('/getall', getallRouter);
app.use('/finished', finishedRouter);
app.use('/getpro', getproRouter);
app.use('/testsol', testsolRouter);








var mysql      = require('mysql');

//각자에 맞게 바꾸기
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'lucifer247',           // CHANGE!
  database : 'kisa',
  port     : '3306' //8886
});
 
connection.connect();




////////////////////////////////////////
app.post('/user', function(req, res){
  console.log(req.body);
  var name = req.body.name;
  var birth = req.body.birth;
  var id = req.body.id;
  var password = req.body.password;
  var email = req.body.email;
  var accessToken = req.body.accessToken
  var refreshToken = req.body.refreshToken
  var userSeqNo = req.body.userSeqNo

  console.log(accessToken , "에세스 토큰 확인")
  console.log(refreshToken)
  // 3개 변수 추가

  var sql = "INSERT INTO kisa.user (name, id, email, password) VALUES (?, ? , ?, ?)"
  // SQL 구문 변경 DB 구조 확인 바람

  connection.query(sql,[name, id, email, password], function (error, results, fields) {
      // [] 배열 정보 변경 -> 변수추가
      if (error) throw error;
      console.log('The result is: ', results);
      console.log('sql is ', this.sql);        
      res.json(1);
  });
})



////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

app.use('/signup', function(req, res){
  res.render('signup');
})

app.use('/login', function(req, res){
  res.render('login');
})
app.use('/main', function(req, res){
  res.render('main');
})

app.use('/forgot', function(req, res){
  res.render('forgot');
})
app.use('/', function(req, res){
  res.render('index');
})


//////////////////////////////////////////////////////
app.use(express.static('public'));
app.use(express.static('build/contracts'));

/////


app.listen(port);
console.log("Listening on port ", port);

module.exports = app;