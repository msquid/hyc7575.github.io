---
title: Node.js(express) - express-session 로그인(2/3)
date: 2017-06-02 21:42:15
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

2장에서는 로그인 및 가입에 관한 로직을 작성하겠습니다. 우선 로그인 form이 있는 login.ejs 파일을 만들겠습니다.

- login.ejs

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
    <form action="/login" method="post">
        아이디 : <input type="text" name="user_id"><br/>
        비밀번호 :<input type="password" name="user_pwd"><br/>
        <input type="submit">
    </form>
</body>
</html>
```
`/login` 엔드포인트로 post요청을 보내는 form입니다. 여기서 입력한 아이디와 패스워드로 가입되어있는 회원이라면 정상적으로 로그인 처리와 세션을 등록해주는 기능을 할 것 입니다.

- app.js

```javascript
app.get('/login', (req, res) => {
    res.render('login'); // login.ejs 랜더링
});
app.post('/login', (req, res) => {
    const body = req.body; // body-parser 사용

    if( findUser( body.user_id, body.user_pwd ) ) {
    // 해당유저가 존재한다면
        req.session.user_uid = findUserIndex( body.user_id, body.user_pwd ); //유니크한 값 유저 색인 값 저장
        res.redirect('/');
    } else {
        res.send('유효하지 않습니다.');
    }
});
```
매우 직관적인 코드여서 이해하기 어렵지 않을 것 입니다.(아마도..?)
해당 유저가 존재한다면 해당 유저의 유니크한 값(여기서는 인덱스)을 세션의 `user_uid`에 저장합니다. 로그인을 하였으면 로그아웃에 관한 기능이 필요한 것은 당연합니다.

- app.js

```javascript
app.get('/logout', (req, res) => {
    delete req.session.user_uid;
    res.redirect('/');
});
```
로그아웃 또한 매우 간단합니다. 세션에 저장되어있는 `user_uid` 프로퍼티를 삭제해주기만 하면 됩니다. 이제 로그인 로그아웃이 구현되었습니다. 이쯤에서 app.js를 실행 하고 테스트를 한번 해보도록 합시다.

![after login](https://cloud.githubusercontent.com/assets/14171723/26726812/771361b8-47df-11e7-9811-241577044c12.png)

users 배열에 hyeok이라는 user_id를 가진 정보로 로그인을 해보았습니다. 정상적으로 닉네임이 표시되는 것을 확인할 수 있습니다. 만료기간을 따로 지정하지 않았기때문에 브라우저를 완전히 종료하지 않는 이상 이 세션은 그대로 유지될 것 입니다. 다음은 회원을 추가(가입)하는 기능을 해보겠습니다. 예상하셨겠지만 그냥 users 배열에 새로운 유저정보 객체를 push해주면 됩니다.

- join.ejs

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
    <form action="/join" method="post">
        아이디 : <input type="text" name="user_id"><br/>
        비밀번호 : <input type="password" name="user_pwd"><br/>
        닉네임 : <input type="text" name="user_nickname"><br/>
        <input type="submit">
    </form>
</body>
</html>
```

- app.js

```javascript
app.get('/join', (req, res) => {
    res.render('join');
});
app.post('/join', (req, res) => {
    const body = req.body;
    if( !findUser(body.user_id, body.user_pwd) ) {
        // 아이디도 중복안되게 분기 해야는데 예제이므로..
        users.push({
            user_id: body.user_id,
            user_pwd: body.user_pwd,
            user_nickname: body.user_nickname
        });
        res.redirect('/login');
    } else {
        res.send('이미 존재함');
    }
});
```
findUser를 통해 유저가 없다고 판단되면 users배열에 새로운 객체를 추가해줍니다. 이제 가입부터 로그인, 로그아웃 모든 기능이 구현되었습니다. 3장에서는 비밀번호를 암호화 하여 저장하는 방법을 알아보겠습니다. 사용할 암호화 방식은 `bcrypt` 알고리즘입니다.
