// Express 기본 모듈 불러오기
//
// 참고: Node.js 기본 모듈 또는 npm으로 설치한 외부 모듈일 경우에는 require()에서 모듈 이름만 적음
var express = require('express');
var http = require('http');

// cookie-parser 미들웨어 모듈 로드
var cookieParser = require('cookie-parser');

// Express 객체 생성
var app = express();

// cookie-parser 미들웨어 추가
app.use(cookieParser());

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// 라우터 객체 참조
var router = express.Router();

// 쿠키 내용을 출력하는 라우팅 함수 추가
router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie를 처리하고 있어요.');

    res.send(req.cookies);
});

// 쿠키를 저장하는 라우팅 함수 추가
router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie를 처리하고 있어요.');

    // 쿠키 설정
    res.cookie('users', {
        id: 'Ryan',
        name: '라이언양',
        autorised: true
    });

    res.redirect('/process/showCookie');
});

// 미들웨어 등록
app.use('/', router);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express 서버가 ' + app.get('port') + '번 포트로 서비스를 시작했어요.');
});