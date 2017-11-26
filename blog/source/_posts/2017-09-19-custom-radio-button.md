---
title: html/css 를 이용한 라디오 버튼 커스터마이징
date: 2017-09-19 18:09:38
tags:
    - html
    - css
    - input radio
    - custom radio
banner:
    url: >-
        /images/htmlcssposter.png
categories:
    - html/css
published: true
---

가끔 웹페이지를 둘러보면 라디오 버튼과 같은 기능을 가지고 있으면서도 스크립트를 사용하여 기능 구현을 하는 경우를 보았습니다. 대부분 흔히 알고 있는 동그란 라디오 버튼과 모양이 많이 달라서 스크립트를 사용한 것 같더군요. 최근 작은 프로젝트를 진행하면서 라디오 버튼을 커스터마이징 해야 할 일이 생겨서 작업한 코드를 남겨볼까 합니다.

우선 예제의 코드펜 링크입니다.
https://codepen.io/small/pen/BwoMRM?editors=1010

```html
<p>grid css 1</p>
<div style="width: 200px;">
    <div class="radio-items">
        <div class="col-6">
            <input id="a1" class="only-sr checked" type="radio" name="temp1" value="1" checked>
            <label for="a1">1</label>
        </div>
        <div class="col-6">
            <input id="a2" class="only-sr" type="radio" name="temp1" value="2">
            <label for="a2">2</label>
        </div>
    </div>
</div>
<br/><br/>
<p>grid css 2</p>
<div style="width: 420px;">
    <div class="radio-items">
        <div class="col-3">
            <input id="b1" class="only-sr checked" type="radio" name="temp2" value="1" checked>
            <label for="b1">1</label>
        </div>
        <div class="col-3">
            <input id="b2" class="only-sr" type="radio" name="temp2" value="2">
            <label for="b2">2</label>
        </div>
        <div class="col-3">
            <input id="b3" class="only-sr" type="radio" name="temp2" value="3">
            <label for="b3">3</label>
        </div>
        <div class="col-3">
            <input id="b4" class="only-sr" type="radio" name="temp2" value="4">
            <label for="b4">4</label>
        </div>
    </div>
</div>
<br/><br/>
<p>grid css 3 (decimal)</p>
<div style="width: 520px">
    <div class="radio-items">
        <div class="col-2">  <!-- width auto important, 소수점 백그라운드 이슈로 인해 auto 설정 -->
            <input id="c1" class="only-sr checked" type="radio" name="temp3" value="1" checked>
            <label for="c1">1</label>
        </div>
        <div class="col-2">
            <input id="c2" class="only-sr" type="radio" name="temp3" value="2">
            <label for="c2">2</label>
        </div>
        <div class="col-2">
            <input id="c3" class="only-sr" type="radio" name="temp3" value="3">
            <label for="c3">3</label>
        </div>
        <div class="col-2">
            <input id="c4" class="only-sr" type="radio" name="temp3" value="4">
            <label for="c4">4</label>
        </div>
        <div class="col-2">
            <input id="c5" class="only-sr" type="radio" name="temp3" value="5">
            <label for="c5">5</label>
        </div>
        <div class="col-2">
            <input id="c6" class="only-sr" type="radio" name="temp3" value="6">
            <label for="c6">6</label>
        </div>
    </div>
</div>
```
label의 명시적 연결을 통해 스크립트의 사용 없이 충분히 원하는 모양으로 커스터마이징이 가능합니다. `<input type="file">`등 다른 input 요소들 또한 같은 방법으로 커스터마이징을 많이 하곤 합니다.

```scss
@mixin ie8 {
    .ie8 {
        @content;
    }
}
　
/* reset */
*{margin: 0; padding: 0}
body {padding: 20px;}
　
/* temp grid */
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-6 {width: 50%;}
　
.only-sr {
    overflow: hidden !important;
    position: absolute !important;
    left: -9999px !important;
    width: 1px;
    height: 1px;
}
.radio-items {
    display: table;
    width: 100%;
    border: 1px solid #454a60;
    border-radius: 4px;
    box-sizing: border-box;
    > div {
        display: table-cell;
        height: 49px;
        line-height: 49px;
        border-left: 1px solid #454a60;
        text-align: center;
    }
    > div:first-child {
        border-left: none;
        width: auto !important;
    }
    label {
        display: block;
        width: 100%;
        height: 100%;
        color: #454a60;
        vertical-align: middle;
        box-sizing: border-box;
        cursor: pointer;
    }
    input[type="radio"]:checked + label{
        background-color: #454a60;
        color: #fff;
    }
}
@include ie8 {
    // ie8 에서는 :checked 미지원하기 때문에 class로 대체, 추가적인 스크립트가 필요합니다.
    // 조건부 주석을 이용하여 html에 ie8이라는 클래스를 추가합시다.
    .radio-items {
        input[type="radio"].checked + label {
            background-color: #454a60;
            color: #fff;
        }
    }
}
```
sass 를 사용하였습니다. 아래 코드펜에서 compiled css를 확인해주세요. (scss 영역에 마우스 올리면 view compiled 버튼이 생깁니다.)

<p data-height="300" data-theme-id="11131" data-slug-hash="BwoMRM" data-default-tab="css,result" data-user="small" data-embed-version="2" data-pen-title="Custom radio button" class="codepen">See the Pen <a href="https://codepen.io/small/pen/BwoMRM/">Custom radio button</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

핵심 키워드는 label의 명시적 연결과 css의 선택자의 조합입니다.
이 방법을 스크립트의 사용 없이 IE9 까지 정상적으로 지원이 가능합니다.
scss 하단을 보시면 ie8의 경우 `:checked`가 아닌 `.checked`를 사용한 것을 보실 수 있습니다.
IE8의 경우는 `:checked` css selector가 지원되지 않기 때문에 간단한 클래스 추가 삭제의 기능이 필요합니다. (여기서부터는 글의 제목과 조금 상이해지네요.)

```html
<!--[if IE 8]><html class="ie ie8" lang="ko"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html lang="ko"><!--<![endif]-->
　
.
.
.
<!-- 각 radio-items에서 checked된 라디오 버튼에 checked 클래스를 기본적으로 부여합니다. -->
<input id="a1" class="only-sr checked" type="radio" name="temp1" value="1" checked>
.
.
.
　
```

우선 조건부 주석을 사용하여 html 요소에 ie8 클래스를 입력하고, 기본으로 체크가 되어있는 라디오 버튼들에게 checked 클래스를 줍니다. 그리고 하단의 javascript를 이용하여 checked클래스 토글 기능을 등록합니다.

```javascript
// util function
function hasClass(target, className) {
    if( (' ' + target.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + className + ' ') > -1 ) return true;
    return false;
}
function removeClass(target, className){
    var elClass = ' ' + target.className + ' ';
    while(elClass.indexOf(' ' + className + ' ') !== -1){
        elClass = elClass.replace(' ' + className + ' ', '');
    }
    target.className = elClass;
}
function addClass(target, className){
    target.className += ' ' + className;   
}
// util function end
　

if( hasClass( document.getElementsByTagName('html')[0], 'ie8' ) ) { // ie8 일 경우
    var radios = document.querySelectorAll('input[type="radio"]'),
        i,
        len = radios.length;
　
    for( i = 0; i < len; i++ ) {
        radios[i].attachEvent('onchange', function(e) {
            var siblingsChecked = this.parentNode.parentNode.querySelector('.checked'); // 이전 checked 버튼

            removeClass(siblingsChecked, 'checked'); // checked 삭제
            addClass(this, 'checked'); // checked 부여
        });
    }
}
```
요약해보면 ie8일 경우 자신에게 checked 클래스를 추가하고 기존의 checked 클래스를 삭제하는 이벤트를 등록하였습니다. 간단한 코드인데도 꽤나 길어지네요. DOM 라이브러리를 사용하시기를 추천합니다.
