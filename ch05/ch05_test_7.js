var http = require('http');
var fs = require('fs');

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

// 클라이언트 요청 이벤트 처리 (버퍼 사용.)
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    var filename = 'RyanLikesWatchingTV.jpg';
    var infile = fs.createReadStream(filename, {flags: 'r'});
    var filelength = 0;
    var curlength = 0;

    fs.stat(filename, function(err, stats) {
        filelength = stats.size;
    });

    // 헤더 작성
    res.writeHead(200, {'Content-Type': 'image/jpeg'});

    // 파일 내용을 스트림으로 읽은 후 클라이언트에게 응답 보내기
    infile.on('readable', function() {
        var chunk;

        while (null !== (chunk = infile.read())) {
            console.log('읽어 들인 데이터 크기: %d 바이트', chunk.length);
            curlength += chunk.length;

            res.write(chunk, 'utf8', function(err) {
                console.log('파일 부분쓰기 완료: %d, 파일크기: %d', curlength, filelength);
                
                // 파일을 모두 읽었을 경우 응답 전송하기
                if (curlength >= filelength) {
                    res.end();
                }
            });
        }
    });
});

// 서버 종료 이벤트 처리
server.on('close', function() {
    console.log('서버를 종료합니다.');
});