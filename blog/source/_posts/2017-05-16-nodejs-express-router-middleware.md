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

route.js 파일을 만들어서 router 모듈을 만들었습니다. 우리는 app.js에 router를 불러와 [app.use()][link1]를 통하여 지정된 경로에 마운트한 것 입니다. (경로가 없다면 모든 요청시마다 실행합니다)

## Middleware(미들웨어)

express는 일련의 미들웨어(함수)들로 이루어져있습니다. 이 미들웨어는 요청, 응답에 대한 부가적인 처리를 할 수 있고 혹은 다음 미들웨어의 실행권한을 가지게 됩니다. 이해가 부족한지 텍스트로 내용을 풀어쓰기가 쉽지가 않아 예제를 보는게 편할듯 합니다. `express.Router() 예제`에서 사용한 app.js를 이어서 사용하겠습니다.

- app.js
```javascript
const express = require('express');
const router = require('./route.js');
const app = express();
　
app.use(function(req, res, next) {
    console.log('1번');
    next(); // 다음 middleware 실행
}, function(req, res, next) {
    console.log('2번');
    next(); // 다음 middleware 실행
});
　
app.get('/', function(req, res) {
    res.send('Home');
});
app.use('/path', router); // '/path'로 시작하는 경로의 경우에만 실행됩니다.
　
app.listen(3000);
```
여기서 사용한 `app.use()`가 미들웨어를 설정하는 부분입니다. (엄밀히 말하면 app.METHOD도 같은기능)
이 메서드는 `app.use([path,] callback [, callback...])`이러한 형태를 가지게 됩니다.
path가 생략되어있다면 모든 요청에서 callback이 실행되고, 그렇지 않다면 해당 path로 시작하는 요청에서 callback이 실행됩니다. 2개 이상의 callback함수를 가지고 있을경우 callback함수의 3번째 함수를 통해 다음 middleware에 접근할 수 있습니다.
