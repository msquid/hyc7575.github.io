---
title: Node.js - File System 모듈(readFile)
date: 2017-05-09 20:04:00
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

[link1]: https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback
[link2]: https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
[link3]: https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_response_write_chunk_encoding_callback
[link4]: https://nodejs.org/dist/latest-v6.x/docs/api/fs.html

## fs 모듈

Node.js 는 fs(file system) 모듈을 이용하여 파일과 디렉토리에 관련된 작업을 할 수 있습니다. 이 fs 모듈의 모든 메서드들은 동기/비동기 양식을 지원하고 있습니다. 동기 방식은 값을 함수에서 바로 return 해주지만 single thread를 사용하는 Node.js는 이 작업이 실행되는 동안은 다른 작업이 실행되는것을 막습니다. 비동기 방식은 다른 작업이 실행되는 것을 막지는 않지만 보장된 순서가 없어 오류가 발생하기 쉽습니다. 어떠한 방식을 사용할지는 경우에따라 본인 판단 후 사용하도록 합시다.


## html 읽기
### Directory
 * project
   * app.js
   * index.html



### 예제
- index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p>안녕하세요.</p>
</body>
</html>
```

- app.js
```javascript
const http = require('http');
const fs = require('fs');
　
const server = http.createServer(function(req, res) {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});
　
server.listen(4000, function() {
    console.log('server running');
});
```

app.js 를 실행 후 `localhost:4000` 을 접속하면 index.html 페이지를 볼 수 있을 것 입니다.

---

## 설명

1. [readFile][link1]
    비동기 방식으로 파일을 읽는 메서드 입니다. file, option, callback 3개의 매개변수를 가지며 callback 을 통하여 error 또는 data를 반환합니다.
    data는 기본적으로 Buffer 객체를 반환 하지만 option을 통하여 encoding type을 지정할 수 있습니다.
    `fs.readFile('index.html', 'utf-8', function(err, data) {});` 이와 같이 encoding type을 utf-8로 변환 후 console.log 를 통하여 data를 찍어보면 html 파일을 string 형태로 보여줄 것 입니다.

2. writeHead
    시작하기에서 언급했듯이 응답값의 헤더를 작성합니다. 이전 예제에서와는 다르게 html 문서를 응답해주므로 `Content-Type` 을 text/html로 작성하였습니다.
    이는 MIME 형식에서 정의한 문자열 입니다. 자세한 내용은 [링크][link2]를 참조

3. end
    end 메서드가 data를 가지고 있는경우 `response.write(data);` 를 실행 후 end를 호출 한 것 과 같은 효과를 줍니다. [write][link3] 메서드는 응답 body에 chunk를 보내주는 역할을 합니다.


가장 자주 쓰이는 파일을 읽는 방법만 알아보았지만 이 외에도 생성, 삭제, 이름변경 등 많은 기능들을 제공하니 api 문서를 참조해보시기를 바랍니다.
[docs][link4]
