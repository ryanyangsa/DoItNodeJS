var http = require('http');

// 웹 서버 객체를 만듦
var server = http.createServer();

// 웹 서버 시작 (포트: 3000)
var port = 3000;
server.listen(port, function(req, res) {
    console.log('웹 서버가 %d번 포트로 시작되었습니다', port);
});