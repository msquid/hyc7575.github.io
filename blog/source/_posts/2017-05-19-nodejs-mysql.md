---
title: Node.js - mysql 연결
date: 2017-05-19 17:37:55
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
    - mysql

published: true
---

[link1]: https://www.freemysqlhosting.net/
[link2]: https://github.com/mysqljs/mysql

## mysql 연결하기
데이터베이스에 관한 설명은 최대한 배제하고 node.js에서 mysql을 사용하는 방법 위주로 다루겠습니다. ~~(제가 db를 잘 몰라요 ㅠ..)~~
예제를 시작하기 앞서 로컬 또는 개인서버에 mysql 설치 후 예제에서 사용하는 table을 만들어야 합니다. 저는 [https://www.freemysqlhosting.net/][link1]에서 테스트용 mysql 서버를 무료로 호스팅 받았습니다.

```sql
CREATE TABLE Projects (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    description VARCHAR(255),
    author VARCHAR(30),
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;;
　
INSERT INTO Projects (name, description, author) VALUES ('node example','node js 연습 프로젝트', 'hyeok');
INSERT INTO Projects (name, description, author) VALUES ('javascript example','javascript 연습 프로젝트', 'kh_j');
```
DB 서버에 접속하여서 Projects라는 테이블과 2개 정도의 테스트용 데이터를 생성하였습니다.
이제 본격적으로 node.js에서 mysql에 접속하는 방법을 살펴보겠습니다.


```
npm init
.
.
.
npm i --save express ejs express-ejs-layouts mysql
```
예제를 진행하기 위한 폴더에서 package.json 파일을 만들고 몇가지 모듈들을 설치합니다.

### Directory
- project
    - config
        - dbconfig.js
    - routes
        - route.js
    - views
        - index.ejs
    - app.js
    - package.json

### 예제

- dbconfig.js
```javascript
module.exports = {
    host     : '<host>',
    user     : '<username>',
    password : '<password>',
    database : '<db_name>'
}
```
데이터베이스 접속 정보를 모듈화 시켜줍니다. 로컬에 mysql을 설치하셨다면 host는 localhost이며 나머지는 mysql을 설치하면서 설정한 값을 넣어주면 됩니다. 제가 사용한 mysql 호스팅은 가입시 메일로 정보를 보내주더군요.

- app.js
```javascript
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes/route.js');

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
　
app.use(expressLayouts);
app.use(router);
　
app.listen(4000);
```
이전까지 예제와 차이가 없습니다. 간단한 세팅과 서버 실행을 담당합니다.

- route.js
```javascript
const express = require('express');
const router = express.Router();
　
const mysql = require('mysql');
const connection = mysql.createConnection(require('../config/dbconfig.js'));
　
connection.connect((err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log( 'mysql connect completed' );
});
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Projects';
    connection.query(sql, (err, results, field) => {
        console.log(results); // 배열 형태로 결과가 떨어짐
        res.render('index', {
            layout: false, // express-ejs-layouts는 기본으로 layout.ejs가 설정되어야 하는데 이를 사용하지 않을 경우
            projects: results
        });
    });
});
　
module.exports = router;
```
route.js에서 mysql 모듈을 불러옵니다.
mysql 모듈의 `mysql.createConnection`을 사용하면 db에 접근할 수 있는 객체(?)를 생성할 수 있습니다. 이 메서드는 인자로 dbconfig.js에서 설정한 정보를 가져옵니다. 이제 우리는 connection 객체로 db에 접근할 수 있게 되었습니다. 다음으로 `connection.connect()`는 db 접속시 발생하는 이벤트입니다. 에러를 인자로 받아 db접속에 실패할 경우 어떠한 에러인지 판별할 수 있고 성공 로그를 남길수도 있습니다. 마지막으로 `connection.query()`입니다. 이 메서드는 db에 쿼리문을 전달하여 결과 값을 받아오는 기능을 합니다. 우리는 첫번째 인자로 string 형태의 쿼리문을 전달하였고 그에대한 callback의 2번째 인자로 결과를 가져왔습니다. 콘솔에 results의 로그를 남겨보면 맨 처음 추가했던 2개의 데이터가 `배열` 형태로 넘어오는 것을 볼 수 있습니다.

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
    <h1>프로젝트 리스트</h1>
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>description</th>
                <th>author</th>
            </tr>
        </thead>
        <tbody>
            <% projects.forEach((item) => { %>
            <tr>
                <td><%= item.id %></td>
                <td><%= item.description %></td>
                <td><%= item.author %></td>
            </tr>
            <% }); %>
        </tbody>
    </table>
</body>
</html>
```
route.js에서 `res.render`부분을 보면 쿼리문에대한 결과를 넘겨주는 것을 볼 수 있습니다. 그로인해 우리는 projects라는 이름의 변수를 사용할 수 있고, 그 변수는 하나의 배열입니다. index.ejs에서는 그 배열을 forEach 돌면서 뿌려주는 역할을 합니다.

이제 app.js를 실행하여 접속하면 2줄의 데이터를 볼 수 있습니다. db에 접속하여 데이터를 추가하거나 삭제 후 새로고침하면 이전과는 다른 화면을 볼 수 있게 되었지요.


## 참고
[mysql][link2]
