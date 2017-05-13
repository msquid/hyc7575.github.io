---
title: Node.js - Router 및 static file serve
date: 2017-05-11 15:51:32
banner:
    url: https://cloud.githubusercontent.com/assets/14171723/25853095/7bf3be3a-3506-11e7-8421-0a2287dd6278.png
categories:
    - Node.js
tags:
    - nodejs
    - javascript
    - javascript server
    - server
    - route
    - router

published: true
---

[link1]: http://danialk.github.io/blog/2013/01/23/simple-node-server/

## 라우팅

라우팅은 Http 요청 메소드(GET, POST 등)에 대한 요청을 어플리케이션이 응답하는 방법을 결정하는 것을 말합니다. 웹 페이지에 접속하는 것 또한 어플리케이션에 GET요청을 보내는 것 이지요.

## static 파일

static 파일(정적 파일)은 html, css, image, js 와 같이 내용이 변함없이 고정 되어서 별도의 작업을 하지 않고 그대로 보내줄 수 있는 파일을 의미합니다.

## Routing & Serve static file with node js
### Directory
- project
    - public
        - css
            - styles.css
        - images
            - image.jpg
    - views
        - 404.html
        - about.html
        - index.html
    - app.js
    - requestHandlers.js
    - router.js
    - server.js

## 예제

- app.js
```javascript
const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');
　
var handle = {}
handle['/'] = requestHandlers.home;
handle['/about'] = requestHandlers.about;
　
server.start(router.route, handle);
```
    필요로하는 모든 기능을 app.js에서 수행하기에는 너무 넓은 영역입니다. 각 기능들을 common.js 표준인 `exports`, `module.exports`를 통해 모듈화하여서 `require`을 통해 불러옵니다. 그리고 handle 객체를 만들어서 server를 실행 시키는 함수에 route함수와 함께 넘겨줍니다. 이 handle객체의 key값은 요청 메서드의 경로입니다.

- server.js
```javascript
const http = require('http');
const url = require('url');
const fs = require('fs');
　
const start = (route, handle) => {
    http.createServer((req, res) => {
        const pathname = url.parse(req.url).pathname;
        route(handle, pathname, res, req);
    }).listen(4000);
}
　
exports.start = start;
```
    여태까지는 createServer메서드의 매개변수로 주고있는 request 이벤트 핸들러에서 response(응답)을 처리하였지만, 이제는 route 함수로 response 객체와 handler 들을 넘겨줍니다.

- router.js
```javascript
const fs = require('fs');
const path = require('path'); // file 경로를 다루기 위한 모듈 (기본)
　
const route = (handle, pathname, res, req) => {
    const extension = path.extname(pathname); // 확장자를 구하는 메서드
    const staticMap = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.mp3': 'audio/mpeg',
    }
    const staticPath = __dirname + '/public';
　
    if (typeof handle[pathname] === 'function') {
        handle[pathname](res, req);
    } else {
        if( staticMap[extension] ) {
            //static file
            fs.readFile( staticPath + pathname, (err, data) => {
                res.writeHead(200, {'Content-Type': staticMap[extension]});
                res.end(data);
            });
        } else {
            fs.readFile('./views/404.html', (err, data) => {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data);
            });
        }
    }
}
　
exports.route = route;
```
    route는 pathname과 일치하는 handler를 가지고 있다면 handle 함수로 다시 response(응답) 객체를 넘겨주고 그렇지 않다면 여기서 처리해줍니다. handler가 가지고 있지 않는 경우라하면 요청이 static 파일이거나 혹은 유효하지 않은 요청을 하였을 경우입니다.
    staticMap을 만들어서 static 파일들일 경우와 아닐 경우를 한번 더 분기 해줍니다.

- requestHandlers.js
```javascript
const fs = require('fs');
　
module.exports = {
    home: (res) => {
        fs.readFile('./views/index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data)
        });
    },
    about: (res) => {
        fs.readFile('./views/about.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
}
```
    라우터에서 호출된 각 handler들은 html파일을 읽어서 넘겨받은 response객체를 통해 브라우저에 보내주는 역할을 하게 됩니다.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>Home</h1>
    <a href="/about">About으로 이동</a>
    <br/>
    <img src="/images/image.jpg" alt="">
</body>
</html>
```
    `localhost:4000`을 접속하면 pathname은 `/`로 정의됩니다, 우리가 라우터로 넘겨준 handle객체에서 `/` 라는 값은 requestHandlers.js의 home이라는 function을 호출하기 때문에 index.html을 응답해줄 수 있습니다. 반대로 이 index.html에서 요청하는 styles.css와 image.jpg는 handle객체가 가지고 있지 않은 값 이지만 staticMap을 통해서 static한 파일임을 알 수 있으므로 정상적인 헤더값을 정의해줄 수 있게 됩니다.



about.html과 404.html또한 views 폴더에 생성한 뒤  app.js를 실행합니다.
`localhost:4000`을 접속하면 index.html
`localhost:4000/about`을 접속하면 about.html
`localhost:4000/abc123`을 접속하면 404.html 을 보여주는 것을 확인할 수 있습니다.


---

## 맺음
Node.js의 기본 모듈만을 사용하여 Router와 static 파일들을 제공하는 방법을 알아보았습니다. 외부모듈이나 express와 같은 framework를 사용하면 더 쉽게 사용할 수 있었겠지만 이 부분은 차차 공부해볼려 합니다.

## 참고
[Simple node server][link1]
