// Express 기본 모듈 불러오기
//
// 참고: Node.js 기본 모듈 또는 npm으로 설치한 외부 모듈일 경우에는 require()에서 모듈 이름만 적음
var express = require('express');
var http = require('http');

// Express 객체 생성
var app = express();

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리하고 있어요.');

    res.writeHead('200', {'Content-Type': 'text/html;charset=utf-8'});
    res.end('<h1>Express 서버에서 응답해요.</h1>');
});

http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트로 서비스를 시작했어요.');
});