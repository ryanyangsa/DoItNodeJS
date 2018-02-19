var http = require('http');

// 웹 서버 객체를 만들면서 클라이언트 요청처리 코드 작성
var server = http.createServer(function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('  <head>');
    res.write('    <title>Node.js 서버요청 응답 페이지</title>');
    res.write('  </head>');
    res.write('  <body>');
    res.write('    <h1>Node.js 서버가 보낸 응답입니다.</h1>');
    res.write('  </body>');
    res.write('</html>');
    res.end();
});

// 웹 서버 시작 (포트: 3000)
var port = 3000;
server.listen(port, function(req, res) {
    console.log('웹 서버가 %d번 포트로 시작되었습니다.', port);
});

// 클라이언트 연결 이벤트 처리
server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('클라이언트(%s)가 %d번 포트로 접속했습니다.', addr.address, addr.port);
});

// 서버 종료 이벤트 처리
server.on('close', function() {
    console.log('서버를 종료합니다.');
});