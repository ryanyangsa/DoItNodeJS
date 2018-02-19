// Express 기본 모듈 불러오기
//
// 참고: Node.js 기본 모듈 또는 npm으로 설치한 외부 모듈일 경우에는 require()에서 모듈 이름만 적음
var express = require('express');
var http = require('http');

// path 메소드 사용을 위해 모듈 로드
var path = require('path');

// static 미들웨어 모듈 로드
var static = require('serve-static');

// Express 객체 생성    
var app = express();

// static 미들웨어 추가
app.use(static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리하고 있어요.');

    var userAgent = req.header('User-Agent');
    var paramName = req.query.name;

    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf-8' });
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>User-Agent: ' + userAgent + '</p></div>');
    res.write('<div><p>Param Name: ' + paramName + '</p></div>');
    res.end();
});

http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트로 서비스를 시작했어요.');
});