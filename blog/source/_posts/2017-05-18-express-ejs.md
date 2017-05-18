---
title: Node.js(express) - express ejs 템플릿
date: 2017-05-18 16:29:26
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
    - ejs
    - ejs-layout
    - layout

published: true
---

[link1]: http://expressjs.com/ko/4x/api.html#res.render


## Render ejs
### directory
- project
    - node_modules
    - views
        - index.ejs
        - layout.ejs
    - app.js
    - package.json



```
npm init
.
.
.
npm i --save express express-ejs-layouts
```
express와 express-ejs-layouts를 설치합니다. ejs가 아닌 express-ejs-layouts인 이유는 이 모듈이 express에서 ejs의 다양한 layout 기능을 추가적으로 제공해주기 때문입니다.

- app.js
```javascript
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
　
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
　
// ejs-layouts setting
app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.use(expressLayouts); //
　
app.get('/', function(req, res) {
    res.render('index', {
        title: '타이틀 입니다.',
        description: '타이틀에 대한 설명이 들어오게 되겠지요?'
    })
});
app.listen(3000);
```
처음 등장하는 코드 위주로 알아보겠습니다.
`app.set('views',__dirname + '/views');` 이 코드는 view 파일들이 있는 경로를 설정하는 영역입니다. `__dirname`은 현재 app.js가 위치한 경로를 알려주는 Node.js의 전역변수인데, 우리는 이 코드를 통해서 app.js와 같은레벨에 있는 views 라는 폴더에 템플릿 파일들이 있다고 app에게 알려준 것 입니다.

`app.set('view engine', 'ejs');` 템플릿 엔진 ejs 사용하겠다고 선언한 것입니다. 이 선언을 함으로써 우리는 [res.render][link1] 메소드에서 .ejs를 생략할 수 있게되었습니다.

`app.set('layout', 'layout');` views/layout.ejs를 기본 레이아웃으로 설정합니다. layout.ejs의 `<%- body %>` 부분에 랜더링된 html 문자열이 들어갑니다.

`app.set("layout extractScripts", true);` 랜더링된 html에서 모든 script태그를 추출합니다. 이 script태그들은 layout.ejs에서 `<%- script %>` 부분에 들어가게 됩니다.
