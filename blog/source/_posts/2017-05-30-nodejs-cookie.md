---
title: Node.js(express) - cookie-parser
date: 2017-05-30 14:14:29
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
    - cookie-parser

published: true
---

[link1]: https://github.com/expressjs/cookie-parser

쿠키란 사용자의 컴퓨터에 웹 사이트로부터 저장된 작은 데이터 조각입니다. 이 데이터를 통하여 사이트 내의 움직임 추적, 중단 시점 체크 등 다양한 기능을 제공할 수 있습니다. 쿠키는 일반적으로 브라우저 하위의 폴더로 저장되게 됩니다. 지금 제가 사용하는 맥의 크롬을 기준으로는 `/Users/{username}/Library/Application Support/Google/Chrome/Default` 폴더의 Cookies라는 파일이 아닐까 합니다. (파일 내부 내용을 봐서는 맞는 것 같은데 정보의 팩트를 체크할 수 가 없네요 ㅠ) 이 파일의 내부를 살펴보면 각 쿠키당 서버의 정보가 있는걸 봐서는 특정 서버에서 만들어진 쿠키는 그 서버에 종속된다고 생각할 수 있겠습니다. 본격적으로 Node.js에서 쿠키를 사용하는 방법을 알아보겠습니다.

## Directory
- project
	- app.js
	- package.json
## 설치

```
npm init
.
.
.
npm i --save express cookie-parser
```
cookie-parser와 express를 설치합니다. `parser`라는 이름에서 예상하셨을 수 있겠지만 기존에 배웠던 body-parser와 사용법이 거의 비슷합니다.

- app.js

```javascript
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
　
app.use(cookieParser());
　
app.get('/toggleChk', (req, res) => {
	res.cookie('checked', req.cookies.checked ? '' : 'checked'); // set cookie
	res.redirect('/');
});
app.get('/', (req, res) => {
    res.send(`
		<input type="checkbox" ${req.cookies.checked}>
		<a href="/toggleChk">쿠키 토글</a>
	`);
});
　
app.listen(3000);
```
cookie-parser 불러와서 미들웨어로 사용하겠다고 선언만 해주시면 `req.cookies`로 접근이 가능해집니다. 이제 app.js를 실행하고 `localhost:3000`에 접속하면 체크박스와 버튼(링크)하나가 보입니다. 이 체크박스는 checked라는 이름의 쿠키 값에 따라 체크가 되어있을수도 아닐수도 있습니다. 처음 실행하였다면 몇번을 새로고침 하여도 체크가 되어있지 않을 것 입니다. 이제 쿠키 토글버튼을 클릭해봅시다. 체크가 되어있는 것을 볼 수 있습니다. 이 버튼(링크)은 checked라는 쿠키를 설정하고 루트경로로 이동시켜주는 요청메서드 였습니다. 이제는 몇번을 새로고침하여도 체크박스에는 체크가 되어있을 것 입니다.



## 참고
[cookie-parser][https://github.com/expressjs/cookie-parser]
