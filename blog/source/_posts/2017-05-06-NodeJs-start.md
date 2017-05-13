---
title: Node.js 시작하기
date: 2017-05-06 19:24:20
banner:
    url: https://cloud.githubusercontent.com/assets/14171723/25853095/7bf3be3a-3506-11e7-8421-0a2287dd6278.png
categories:
    - Node.js
tags:
    - nodejs
    - javascript
    - javascript server
    - server

published: true
---

[link1]: https://nodejs.org/ko
[link2]: https://nodejs.org/ko/download/package-manager/
[link3]: https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
[link4]: https://nodejs.org/api/http.html#http_response_end_data_encoding_callback


## 설치

Node js 공식 [홈페이지][link1] 에서 설치,
이 외 여러 package manager를 사용하여 설치가 가능합니다. [참조][link2]

---
## Hello World

Node.js 어플리케이션은 javascript로 구현되며, .js 확장자를 사용합니다.
http 통신을 하는 hello world 어플리케이션을 만들기 위해 app.js 파일을 생성합니다.

- app.js
```javascript
const http = require('http'); // http 모듈을 불러온다.
const port = 4000;
　
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
}).listen(port, () => {
    // callback
    console.log('server running');    
});
```
Node.js 6.x 는 es6의 지원이 원활 하므로 var 이 아닌 const 를 사용 하였습니다. (자세한 사항은 http://node.green/ 를 참조)


- terminal
```
node app
```
app.js 를 생성 후 터미널에 접속하여 node 실행 명령어를 입력합니다.
`server running` 이라는 표시가 뜰 것 이고 `localhost:4000` 에 접속하면 hello world 어플리케이션이 완성 되어있는 것을 볼 수 있습니다.

---

## 설명

1. http 모듈
    app.js 의 1번 line을 보면 `require('http');` 를 통하여 http라는 변수(상수)에 선언합니다. http 모듈은 HTTP 웹 서버와 관련된 기능들을 담은 모듈로써 동작됩니다.

2. http.createServer()
    http 객체의 `createServer` 메서드는 server 객체를 생성하도록 해줍니다.
    반환된 server 객체는 listen, close 메서드를 사용하여 서버를 실행, 종료 할 수 있고, 그 외 request, connection, close 등의 이벤트를 연결할 수 있습니다.

3. requestListener
    위에서 언급한 server 객체의 request(요청) 이벤트 핸들러는 따로 지정할 필요 없이 app.js 의 예제와 같이, `createServer` 메서드의 매개변수로 넘겨 줄 수 있습니다. 이 이벤트는 request와 response 라는 객체를 매개변수로 전달 받습니다.
    그 중 response 객체의 [writeHead][link3]는 요청에 대한 응답 헤더를 작성하고, [end][link4]는 응답헤더와 본문이 전달 되었음을 server에 알려줍니다(end 메서드는 각 응답마다 반드시 호출 되어야 합니다).
