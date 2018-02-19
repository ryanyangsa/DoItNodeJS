var http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};

var req = http.get(options, function(res) {
    // 응답 처리
    var resData = '';
    
    // 다른 서버에서 응답을 받는 경우 data 이벤트가 호출됨
    res.on('data', function(chunk) {
        resData += chunk;
    });

    // 다른 서버에서 보낸 데이터 수신이 완료되면 end 이벤트가 호출됨
    res.on('end', function() {
        console.log(resData);
    });
});

req.on('error', function(err) {
    console.log('오류 발생: ' + err.message);
});