---
title: Node.js(express) - express-session with 로그인(3/3)
date: 2017-06-03 21:18:39
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
    - bcrypt
    - 암호화

published: true
---

[link1]: https://en.wikipedia.org/wiki/Bcrypt
[link2]: https://en.wikipedia.org/wiki/PBKDF2

[link3]: https://www.npmjs.com/package/bcrypt-nodejs
[link4]: https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts
[link5]: http://minix.tistory.com/406

패스워드와 같은 중요한 정보는 누군가에게 알려져서는 안되는 정보입니다. 만약 이 정보가 털리더라도 복호화를 할 수 없는 단방향 암호화를 사용하는것이 일반적이라고 할 수 있습니다. 그래서 2장까지 진행하였던 로그인 예제의 패스워드를 암호화 하여 저장하는 방법을 알아보려고 합니다. 사용되고 있는 여러 암호화 알고리즘이 있지만 저는 [bcrypt][link1]를 사용하도록 하겠습니다. [pbkdf2][link2]와 더불어 많이 쓰이는 방법 중 하나입니다.

가입을 진행할때 여태까지는 사용자가 입력한 값을 그대로 저장하였지만 암호화를 진행하고 생성된 Digest(암호화된 값)을 저장하면 됩니다.
```javascript
app.post('/join', (req, res) => {
    const body = req.body;
    if( !findUser(body.user_id, body.user_pwd) ) {
    	// 아이디도 중복안되게 분기 해야는데 예제이므로..
        const salt = bcrypt.genSaltSync(10); // salt값 생성, 10이 default
        const hash = bcrypt.hashSync(body.user_pwd, salt); // Digest
        users.push({
            user_id: body.user_id,
            user_pwd: hash,
            user_nickname: body.user_nickname
        });
    	res.redirect('/login');
    } else {
    	res.send('이미 존재함');
    }
});
```
5, 6번 라인이 암호화를 진행하는 작업이다. salt라는 것 은 비밀번호를 암호화 하기 전에 랜덤한 값을 더하여 결과 값을 무작위로 만들어줍니다. 동일한 패스워드를 입력하더라도 생성된 값은 항상 다르게 되는것 이지요. 인자로 숫자가 들어가있는데 2^n만큼 해싱작업을 진행합니다.(자세한 내용은 범위가 작지 않은것 같으므로 생략하겠습니다.) 이제 생성된 값을 users에 저장합니다. 이제 비밀번호는 더 이상 우리가 입력한 값을 그대로 비교하는 것으로는 인증이 되지 않습니다. find하는 과정을 수정해야 합니다.

```javascript
const findUser = (user_id, user_pwd) => {
    // id와 password가 일치하는 유저 찾는 함수, 없으면 undefined 반환
    return users.find( v => (v.user_id === user_id &&  bcrypt.compareSync(user_pwd, v.user_pwd) ) );
}
const findUserIndex = (user_id, user_pwd) => {
    // 일치하는 유저의 index값(유니크) 반환
    return users.findIndex( v => (v.user_id === user_id && bcrypt.compareSync(user_pwd, v.user_pwd)) );
}
```
사용자가 입력한 비밀번호를 `compareSync`를 사용하여 저장되어있는 비밀번호와 비교합니다. 일치하면 true를 반환해줄 것 입니다. 이제 암호화와 관련된 모든 작업을 마쳤습니다.

## 맺음
저도 처음 공부해본 내용이라 혹 개념적으로 틀린 내용이 있다면 알려주시면 감사합니다 ㅠ

## 참고
- [bcrypt][link3]
- [bcrypt동작][link4] (db에 salt를 저장하지 않아서 어떻게 가지고 있나 찾아보다가 발견한 글 입니다)
- [한국식 보안 상황에서 살아남는 법][link5] (우연히 발견한 글인데 재미있게 봐서 공유합니다 보안쪽은 잘 모르는데 재미있게 잘 보았네요.)
