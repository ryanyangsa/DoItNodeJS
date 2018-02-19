// Express 기본 모듈 불러오기
//
// 참고: Node.js 기본 모듈 또는 npm으로 설치한 외부 모듈일 경우에는 require()에서 모듈 이름만 적음
var express = require('express');
var http = require('http');

// path 메소드 사용을 위해 모듈 로드
var path = require('path');

// body-parser 미들웨어 모듈 로드
var bodyParser = require('body-parser');

// static 미들웨어 모듈 로드
var static = require('serve-static');

// Express 객체 생성    
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// 라우터 객체 참조
var router = express.Router();

// 라우팅 함수 등록
router.route('/process/login/:name').post(function(req, res) {
    console.log('/process/login/:name을 처리하는 미들웨어입니다.');

    var paramName = req.params.name;

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf-8' });
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param name: ' + paramName + '</p></div>');
    res.write('<div><p>Param id: ' + paramId + '</p></div>');
    res.write('<div><p>Param password: ' + paramPassword + '</p></div>');
    res.write('<br><br><a href="/public/login3.html">로그인 페이지로 돌아가기</a>');
    res.end();
});

// body-parser를 사용해 application/x-www-form-urlencoded 해석
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 해석
app.use(bodyParser.json());

// static 미들웨어 추가
app.use(static(path.join(__dirname, 'public')));

// 미들웨어에서 클라이언트에서 POST로 전송된 query string 화인
app.use('/', router);

// 등록되지 않은 Path 요청 시 보여줄 페이지 설정
app.use('*', function(req, res) {
    res.status(404).send('<h1>ERROR - 요청하신 페이지를 찾을 수 없습니다.</h1>');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express 서버가 ' + app.get('port') + '번 포트로 서비스를 시작했어요.');
});