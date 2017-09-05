---
title: Node.js(express) - express-session with 로그인(1/3)
date: 2017-06-02 13:45:56
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
    - express-session
    - nodejs login

published: true
---
[link1]: https://stackoverflow.com/questions/40381401/when-use-saveuninitialized-and-resave-in-express-session
[link2]: https://github.com/expressjs/session

세션은 쿠키와 마찬가지로 웹 사이트로 부터 저장되는 데이터이며 조금 더 발전(?)한 기능입니다. 세션은 쿠키와는 다르게 사용자의 컴퓨터가 아닌 서버에 저장이 되며, 저장된 데이터는 세션을 생성하면서 사용자의 쿠키에 저장된 식별자 정보를 통해 접근할 수 있습니다. 누군가에게 알려져서는 안될 정보들은 보다 안전한 세션에 저장해두어야 합니다. `express-session`이라는 모듈을 사용하여 사용자의 로그인 인증정보를 세션에 저장하는 방법을 알아보겠습니다.

## Directory
- project
	- views
		- index.ejs
		- join.ejs
		- login.ejs
	- app.js

## 설치
```
npm init
.
.
.
npm i --save express ejs express-session body-parser bcrypt-nodejs
```
회원을 추가하는 부분도 포함되었기 때문에 body-parser도 사용하였고, bcrypt-nodejs는 3장에서 살펴볼 암호화와 관련된 모듈입니다.

## 예제

### 세션 미들웨어 등록
- app.js

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs'); // 3장에서 사용할 암호화 모듈
　
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
　
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
    resave: false,
    saveUninitialized: true
}));
　
app.listen(3000);
```
우선 세션 미들웨어 등록하는 방법부터 알아보겠습니다. 10번 라인을 보시면 express-session모듈에서 가져온 미들웨어를 등록하는 부분이 있습니다. 이 부분을 등록하면 요청시 마다 req.session으로 세션 객체에 접근할 수 있게 됩니다. 옵션으로 들어간 값을 한번 살펴보겠습니다.

- secret: secret은 필수로 들어가야하는 옵션입니다. 세션은 기본적으로 식별자를 쿠키에 저장하게 되는데 그 저장되는 데이터를 **암호화** 하기위해 필요한 옵션입니다.

- resave: 요청이 왔을때 세션을 수정하지 않더라도 세션을 다시 저장소에 다시 저장되도록 합니다. 2개 이상의 병렬요청이 왔을 경우 원치 않은 저장이 이루어질 수 있으니 유의 해야합니다. (false 권장)

- saveUninitialized: 초기화 되지 않은 세션을 강제로 저장합니다. 이는 모든 방문자들에게 고유한 식별 값을 주는 것과 같습니다.

<!-- (resave와 saveUninitialized의 **관계**가 조금 헷갈려서 자료를 찾아보았지만 명쾌한 자료를 찾을 수가 없었습니다. 그나마 괜찮은 자료는 [이것][link1] 입니다.) -->
이제 라우팅 처리를 하기 전 회원과 관련된 몇몇 기능을 미리 만들어 두겠습니다.
```javascript
// app.js 내부에 선언합니다.
const users = [
    {
        user_id: 'hyeok',
        user_nickname: '혁',
        user_pwd: '123456'
    },
    {
        user_id: 'hyc7575',
        user_nickname: '에이치',
        user_pwd: '1q2w3e4r'
    }
]
const findUser = (user_id, user_pwd) => {
    // id와 password가 일치하는 유저 찾는 함수, 없으면 undefined 반환
    return users.find( v => (v.user_id === user_id && v.user_pwd === user_pwd) );
}
const findUserIndex = (user_id, user_pwd) => {
    // 일치하는 유저의 index값(유니크) 반환
    return users.findIndex( v => (v.user_id === user_id && v.user_pwd === user_pwd) );
}
```
users라는 회원 로그인 정보와 해당 유저를 찾는함수 그리고 해당 유저의 인덱스값(유니크한 값으로써 사용)을 구하는 함수를 생성하였습니다. 기본적으로 필요로한 기능들은 만들어졌으니 라우팅 작업을 시작합니다.

- app.js

```javascript
// 미들웨어 아래쪽으로 배치해주세요.
app.get('/', (req, res) => {
    const sess = req.session; // 세션 객체에 접근
    res.render('index', {
        nickname: sess.user_uid+1 ? users[sess.user_uid]['user_nickname'] : ''
    });
});
```
- index.ejs

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
    <h1>Home</h1>
    <% if( !nickname ) { %>
    <p>로그인을 해주세요.</p>
    <a href="/login">로그인</a>
    <a href="/join">회원가입</a>
    <% } else { %>
    <p>안녕하세요. <%= nickname %>님</p>
    <a href="/logout">로그아웃</a>
    <% } %>
</body>
</html>
```
라우터에서 넘겨준 nickname값의 유무를 통해 로그인 여부를 판단하고 각각 다른 값을 랜더링 해주도록 만들었습니다.

이제 session을 사용하기위한 모든 준비가 끝났습니다. 미들웨어의 옵션으로 `saveUninitialized`값을 true로 설정해주었기 때문에 app.js를 실행하고 접속하면 아직 세션에 아무런 값도 설정해주지는 않았지만 쿠키에 고유한 식별값을 남겨두었을 것 입니다.
![connect.sid](https://cloud.githubusercontent.com/assets/14171723/26714475/7a8b74da-47ac-11e7-8a64-522a0f5df510.png)
기본적으로 connect.sid라는 이름으로 저장됩니다. 이 쿠키값을 통해서 메모리에 저장되어있는 세션정보를 읽을 수 있는 것 입니다. 로그인 및 가입 구현은 2장에서 진행하겠습니다.

## 참고
[express-session][link2]에서 세션 설정에 관한 많은 옵션들을 살펴보실 수 있습니다.
