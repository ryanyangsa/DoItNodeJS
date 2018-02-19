var http = require('http');

// 웹 서버 객체를 만듦
var server = http.createServer();

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

// 클라이언트 요청정보 출력
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');
    console.dir(req);
});

// 서버 종료 이벤트 처리
server.on('close', function() {
    console.log('서버를 종료합니다.');
});