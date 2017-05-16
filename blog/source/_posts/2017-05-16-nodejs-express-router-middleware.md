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
const router = require('./route.js');
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
