---
title: Node.js(express) - Router와 middleware
date: 2017-05-16 17:50:00
banner:
    url: https://cloud.githubusercontent.com/assets/14171723/25853095/7bf3be3a-3506-11e7-8421-0a2287dd6278.png
categories:
    - Node.js
tags:
    - nodejs
    - javascript
    - javascript server
    - server
    - express
    - Router
    - middleware

published: true
---

[link1]: http://expressjs.com/ko/4x/api.html#app.use
[link2]: https://github.com/expressjs/body-parser
[link3]: http://expressjs.com/ko/guide/using-middleware.html#middleware.application
[link4]: http://stackoverflow.com/questions/29175465/body-parser-extended-option-qs-vs-querystring

## Router

express에서 router는 기본적으로 아래와 같은 형태를 가집니다.
```javascript
app.METHOD(PATH, HANDLER)
```
- METHOD: http 요청 메서드
- PATH: 경로(엔드포인트)
- HANDLER: 실행될 함수

몇가지 예를 들어보면

```javascript
app.get('/home', function(req, res) {
    res.send('home 접속');
});
app.post('/user', function(req, res) {
    res.send('user에 대한 post 요청 처리');
});
app.put('/user', function(req, res) {
    res.send('user에 대한 put 요청 처리');
});
app.delete('/user', function(req, res) {
    res.send('user에 대한 delete 요청 처리');
});
```
가장 많이 사용되는 4가지 http 메서드에 대한 예제입니다.
보시면 `/user` 경로가 중복되는 경우가 있는데 이럴 경우 `app.route(path)`를 사용할 수 있습니다.

```javascript
app.route('/user')
    .post(function(req, res) {
        res.send('user에 대한 post 요청 처리');
    })
    .put(function(req, res) {
        res.send('user에 대한 put 요청 처리');
    })
    .delete(function(req, res) {
        res.send('user에 대한 delete 요청 처리');
    });
```

### express.Router

라우터의 기본 사용방법을 보았으니 이를 모듈화 시키는 방법을 보겠습니다.

- app.js
```javascript
const express = require('express');
const router = require('./route'); // 모듈화된 router를 불러옵니다.
const app = express();
　
app.use(router);
　
// 1번쨰 매개변수로 받은 /hi에 대한 라우팅이 가능하도록 해줍니다. ex) /hi, /hi/about, /hi/user
// app.use('/hi', router);
　
app.listen(4000);
```

- route.js
```javascript
const express = require('express');
const router = express.Router();
　
router.get('/', function(req, res) {
  res.send('Home 접속');
});
router.get('/about', function(req, res) {
  res.send('About 접속');
});
router.post('/user', function(req, res) {
    res.send('user에 대한 post 요청');
});
　
module.exports = router;
```

route.js 파일을 만들어서 router 모듈을 만들었습니다. 우리는 app.js에 router를 불러와 [app.use()][link1]를 통하여 지정된 경로에 미들웨어로 마운트한 것 입니다. (경로가 없다면 모든 요청시마다 실행합니다)

## Middleware(미들웨어)

express는 일련의 미들웨어(함수)들로 이루어져있습니다. 이 미들웨어는 요청, 응답 사이에서 부가적인 처리를 할 수 있고 다음 미들웨어의 실행권한을 가지게 됩니다. 이해가 부족한지 텍스트로 내용을 풀어쓰기가 쉽지가 않아 예제를 보는게 편할듯 합니다. `express.Router() 예제`에서 사용한 app.js를 이어서 사용하겠습니다.

- app.js
```javascript
const express = require('express');
const router = require('./route.js');
const app = express();
　
app.use(function(req, res, next) {
    req.testValue = '안녕하세요.';
    console.log('1번');
    next(); // 다음 middleware 실행
}, function(req, res, next) {
    console.log('2번');
    next(); // 다음 middleware 실행
});
　
app.get('/', function(req, res) {
    console.log('home', req.testValue);
    res.send('Home');
});
app.use('/path', router); // '/path'로 시작하는 경로의 경우에만 실행됩니다.
　
app.listen(3000);
```
서버를 실행 시킨 뒤 `localhost:3000`에 접속하면 터미널에 3개의 콘솔이 찍힌 것을 볼 수 있습니다.
- terminal
```
1번
2번
home 안녕하세요.
```
작성한 미들웨어가 위에서부터 순차적으로 실행된다것과(중요!) `req.testValue`를 보아 미들웨어 스택내에서 같은 request, response를 공유하고 있다는 것을 알 수 있습니다.

여기서 사용한 `app.use()`가 미들웨어를 설정하는 부분인데, (app.METHOD도 미들웨어 설정이라고 볼 수 있음)
이 메서드는 `app.use([path,] callback [, callback...])`이러한 형태를 가지게 됩니다.
path가 생략되어있다면 모든 요청에서 callback이 실행되고, 그렇지 않다면 해당 path로 시작하는 요청에서 callback이 실행됩니다. 또한 각 미들웨어는 다음에 실행되는 미들웨어의 실행 권한을 가지고 있습니다. 일반적으로는 예제에서 사용한 next라는 이름의 변수를 사용합니다. `next()`를 호출하지 않는다면 다음 미들웨어를 실행하지 않게 되겠지요. 만약 응답을 보내주지도 않았다면 요청이 온 상태에서 멈춰버리게 됩니다. ( 파비콘자리에 빙글빙글 도는 로딩바를 보실 수 있습니다 ㅠㅠ )

지금까지 직접 미들웨어를 만드는 방법을 알아보았습니다. 이제는 express에서 기본으로 제공하는 미들웨어와 써드파티 미들웨어를 사용하는 법을 알아보려 합니다. 마찬가지로 app.js를 그대로 사용하겠습니다.

우선 npm을 통하여 모듈을 설치합니다.
- terminal
```
npm i --save body-parser
```

- app.js
```javascript
const express = require('express');
const router = require('./route.js');
const app = express();
const bodyParser = require('body-parser'); // 설치한 모듈을 불러옵니다.
　
// set static file directory
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
　
app.use(function(req, res, next) {
    req.testValue = '안녕하세요.';
    console.log('1번');
    next(); // 다음 middleware 실행
}, function(req, res, next) {
    console.log('2번');
    next(); // 다음 middleware 실행
});
　
app.get('/', function(req, res) {
    console.log('home', req.testValue);
    res.send('Home');
});
app.use('/path', router); // '/path'로 시작하는 경로의 경우에만 실행됩니다.
　
app.listen(3000);
```
express가 4.X 버전에 올라오면서 `express.static`을 제외한 기본 미들웨어들은 모두 별도의 모듈로 분리 되었습니다. 7번줄에서 사용한 이 메서드는 정적파일들을 제공해주는 역할을 합니다. 지난번 예제에서 `staticMap`을 만들어서 확장자에 따른 각 헤더값을 정해주는 작업을 이제는 하지 않아도 되는 것이지요.

다음으로는 써드파트 미들웨어입니다. npm을 통하여 사용할 모듈을 설치하고 app.use() 를 통해 미들웨어로써 마운트한 것입니다. 예제에서는 [body-parser][link2]라는 모듈을 설치하였는데 이 모듈은 요청 바디를 파싱하여서 req.body 객체로 접근할 수 있도록 도와줍니다. `bodyParser.urlencoded()`는 헤더의 Content-Type이 `application/x-www-form-urlencoded`일 경우(form태그의 기본 인코딩 타입이다)에 대한 파싱을 해주고, `bodyParser.json()`은 마찬가지로 Content-Type이 `application/json`일 경우에 대한 파싱을 해줍니다. 추가로 bodyParser.urlencoded의 옵션으로 들어가는 extended는 값에 따라서 데이터 파싱을 `querystring` 라이브러리를 사용하는지 `qs` 라이브러리로 하는지의 차이를 가지고 있다고 합니다. 자세한 내용은 하단 참고링크를 걸어두겠습니다.

## 참고
- [미들웨어][link3]
- [body-parser][link2] - urlencoded를 검색
- [body-parser(qs vs querystring)][link4]
