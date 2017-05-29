---
title: Node.js(express) - body-parser와 multer
date: 2017-05-24 14:31:33
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
    - body-parser
    - bodyParser
    - multer
    - form submit

published: true
---

[link1]: https://github.com/expressjs/body-parser
[link2]: https://github.com/expressjs/multer
[link3]: https://hyc7575.github.io/2017/05/16/2017-05-16-nodejs-express-router-middleware/

Node.js에서 form양식을 submit을 하기위해 사용되는 [body-parser][link1]와 [multer][link2] 미들웨어에 대해서 간단하게 알아보려 합니다. 각 미들웨어의 용도를 짧게 소개하면 `body-parser`는 [라우터와 미들웨어][link3] 예제때 언급하였듯 요청 바디를 파싱하여서 req.body 객체로 접근할 수 있도록 도와주고, `multer`는 파일을 업로드를 도와주는 미들웨어 입니다.

## Directory
- project
    - uploads
    - views
        - form.ejs
    - app.js
    - package.json

uploads폴더는 업로드한 파일들이 들어가는 폴더입니다.
## 설치
```
npm init
.
.
.
npm i --save body-parser multer express ejs
```

## 예제

body-parser부터 차근차근 진행하도록 하겠습니다.

- form.ejs
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        *{margin:0; padding: 0;}
    </style>
</head>
<body>
    <form action="/userForm" method="post">
        <table>
            <tbody>
                <tr>
                    <td>
                        <label for="userName">이름</label>
                    </td>
                    <td>
                        <input id="userName" type="text" name="userName">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="userAge">나이</label>
                    </td>
                    <td>
                        <input id="userAge" type="text" name="userAge">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="userJob">직업</label>
                    </td>
                    <td>
                        <input id="userJob" type="text" name="userJob">
                    </td>
                </tr>
            </tbody>
        </table>
        <input type="submit" value="전송">
    </form>
</body>
</html>
```
`/userForm` 포인트로 post요청을 보내는 form을 생성합니다.

- app.js
```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
　
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
　
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // 이번예제에서는 사용되지 않습니다...
　
app.get('/', (req, res) => {
    res.render('form');
});
app.post('/userForm', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});
　
app.listen(3000);
```
`/userForm`으로 post요청이 들어오게되면 req.body객체를 웹페이지에 json형태로 뿌려주도록 하였습니다. 이 상태로 어플리케이션을 실행하여 테스트 해봅니다.

`{"userName": "hyeok", "userAge": "20", "userJob": "Front-end developer"}` 아마 이러한 형태의 결과를 보실 수 있으시라 생각합니다. 이전 포스팅에서 언급하였듯 form submit이 발생시 기본적으로 Content-Type이 x-www-form-urlencoded로 요청이 들어오는데 이 경우 `bodyParser.urlencoded()`가 input의 name과 매칭된 req.body 객체를 생성해줍니다. 이제 파일 업로드를 추가해보도록 하겠습니다.

- form.ejs
```html
<form action="/userForm" enctype="multipart/form-data" method="post">
.
.
.
<tr>
    <td>
        <label for="userImage">사진</label>
    </td>
    <td>
        <input id="userImage" type="file" name="userImage">
    </td>
</tr>
```
input file이 들어간 로우 하나를 테이블에 추가하고, form태그의 enctype을 multipart/form-data로 명시해줍니다. 인코딩 타입을 이렇게 지정해야지만 form태그로 file전송을 할 수 있습니다.

- app.js
```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // 이 예제에서는 bodyParser가 필요하지 않지만...
const multer = require('multer');
const upload = multer({dest: 'uploads/'}); // uploads 폴더에 파일을 저장
　
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
　
app.use(bodyParser.urlencoded({extended: false})); // 이번예제에서는 사용되지 않지만...
app.use(bodyParser.json()); // 이번예제에서는 사용되지 않지만...
　
app.use(express.static('uploads')); // 업로드된 이미지를 요청하여 표시한다면 넣어줍시다.
　
app.get('/', (req, res) => {
    res.render('form');
});
app.post('/userForm', upload.single('userImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send(`
        body: ${JSON.stringify(req.body)},<br/>
        file: ${JSON.stringify(req.file)}
    `);
});
　
app.listen(3000);
```
`multer({dest: 'uploads/'});` 이 함수는 미들웨어를 리턴하며, 옵션으로 들어간 dest의 value인 uploads에(폴더) 파일을 저장하겠다고 설정한 것 입니다. 그리고 리턴된 이 미들웨어는 `/userForm`에 post요청이 왔을 때 인자로 전해지는 `upload.single('userImage')` 미들웨어( 인자는 input file의 name값 )로 사용됩니다. 이 단계에서 req.body와 req.file에 접근 가능하도록 도와줍니다.( Content-Type이 multipart/form-data여서 body-parser가 해주지 않아요 ) 이제 어플리케이션을 실행하고 테스트를 진행합니다.

body와 file의 정보가 객체형태로 넘어오고 uploads폴더에 파일이 저장되는것을 볼 수 있지만 이름이 랜덤하고 확장자도 없이 들어오고 있습니다. `storage`라는 것을 사용하여 파일이 디스크에 저장될때를 컨트롤할 수 있다고 하니 사용해보도록 합시다.
- app.js
```javascript
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
})
const upload = multer({storage: storage});
```
큰 변화는 없고 multer의 인자로 dest대신 storage를 설정해줍니다. destination은 파일이 저장될 위치이고, filename은 저장되는 파일의 이름을 설정합니다. 임시방편으로 Date.now()를 사용하였지만 유니크한 값을 만들어주는 모듈들을 설치하여서 사용하는 것을 추천 드립니다. 다시 한번 저장 후 어플리케이션을 실행하면 원본이름을 포함하고 있는 파일이 저장되어 있는 것을 볼 수 있습니다.

## 맺음
예제에서는 upload.single()을 사용하여 하나의 파일만을 업로드하는 경우를 살펴보았지만, upload.array()나 upload.fields() 등 을 사용하면 여러 파일을 업로드할 수 있습니다. 자세한 내용은 [링크][link2]에서 확인해 보실 수 있습니다.
