---
title: Node.js - express 프레임워크
date: 2017-05-13 13:47:37
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

published: true
---

[link1]: http://expressjs.com/ko/starter/generator.html
[link2]: http://expressjs.com/ko/4x/api.html#app.get
[link3]: http://expressjs.com/ko/4x/api.html#app.listen
[link4]: http://expressjs.com/ko/4x/api.html#res.send
## express

express.js는 Node.js에서 사용하는 웹 앱 프레임워크입니다.
처음 express를 접해보았을 때는 버전이 3.X 가 나온지 얼마 안되었을 때 같은데 어느새 4.X로 올라왔고 Connect 모듈에 대한 종속성이 사라졌다고 합니다. ( 3.X -> 4.X로 버전 업을 할 경우 Connect에 종속된 미들웨어는 따로 처리를 해주셔야 합니다. )

### 설치

```terminal
mkdir express-exam01
cd express-exam01
```
express 설치할 폴더를 생성 후 해당 폴더로 이동합니다.

```terminal
npm init
```
npm init을 통해 해당 폴더를 npm project로 만들고 package.json을 생성합니다.

```terminal
npm i express --save
```
npm을 이용하여 express를 설치 save 옵션을 통해 package.json의 dependencies에 express를 추가해줍니다. ( 임시로 사용할 것 이라면 save 옵션을 주지 않아도 괜찮습니다 )

### 실행

express-exam01폴더에 app.js를 생성합니다.

- app.js
    ```javascript
    const express = require('express');
    const app = express();
    　
    app.get('/', function(req,res) {
        res.send('생성 완료');
    });
    app.listen(4000);
    ```

터미널을 통해 app.js를 실행 후 `localhost:4000`을 접속하면 웹 서버가 정상적으로 동작하는 것을 확인할 수 있습니다.


`express()`를 통하여 express 어플리케이션을 객체를 반환 합니다. 우리는 반환된 객체를 통해서 어플리케이션을 작성합니다.
4번 라인의 [app.get][link2] 메서드를 사용하여 http get요청에 대한 route를 정의하였고, 5번라인의 [res.send][link4]는 http 응답을 보내는 역할을 해줍니다. 특징이라면 헤더를 자동으로 지정해줍니다. 7번 라인의 [app.listen][link3] 메서드를 사용하여 서버를 실행 시켰습니다. http 모듈의 listen과 동일한 기능을 수행합니다.

<!--
> Express는 자체적인 최소한의 기능을 갖춘 라우팅 및 미들웨어 웹 프레임워크이며, Express 애플리케이션은 기본적으로 일련의 미들웨어 함수 호출입니다. -->
