---
title: Vue.js - Directive(지시자) 2/2
date: 2017-07-12 10:18:38
tags:
  - javascript
  - vue
  - vue js
  - directive
  - 디렉티브
  - 지시자
banner:
  url: >-
    https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/480px-Vue.js_Logo.svg.png?uselang=ko
categories:
  - Javascript
  - vue
---

이번 2장에서 아직 다루지 않은 디렉티브들을 살펴볼 예정입니다. ( 요즘 프로그래밍 외 적으로 하고 있는 게 있어서 포스팅이 순위에서 많이 밀리네요 ㅠ )

## 이벤트 바인딩 v-on

```html
<div id="app">
    <button v-on:click.once="myClickEvent">이벤트 바인딩 1( once )</button><br/><br/>
    <a href="/달나라" v-on:click.prevent="myClickEvent">이벤트 바인딩 2( prevent )</a>
    <div class="mouse-area" v-on:mouseEnter="areaEnter" v-on:mouseLeave="areaLeave">
        {{ areaState }}
    </div>
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        areaState: '마우스를 올려줘요!'
    },
    methods: {
        myClickEvent: function() {
            alert('테스트 이벤트입니다!');
        },
        areaEnter: function(e) {
            this.areaState = '들어왔다!';
        },
        areaLeave: function(e) {
            this.areaState = '나갔다!';
        }
    }
})
```
<p data-height="300" data-theme-id="11131" data-slug-hash="zzyNma" data-default-tab="result" data-user="small" data-embed-version="2" data-pen-title="zzyNma" class="codepen">See the Pen <a href="https://codepen.io/small/pen/zzyNma/">zzyNma</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

v-on 디렉티브를 사용하여서 우리가 methods에 등록한 메서드들을 특정 요소(element)의 이벤트로 연결 시켜줍니다. 사용 방법을 살펴보면 이벤트를 연결시킬 요소에 `v-on:event="function"` 형태로 등록을 하게 됩니다. 2번 라인의 버튼을 살펴보면 click 이벤트로 Vue 인스턴스에 등록된 myClickEvent를 연결 시킨 모습을 볼 수 있습니다. 이제 버튼을 클릭하면 alert 경고창을 볼 수 있게 됩니다. 여기서 잘 살펴보면 위 언급한 형태와 조금 상이한 부분을 찾을 수 있습니다. `.once` 라는 `수식어`가 추가 된 점입니다. .once 수식어를 사용하면 이벤트를 1번만 처리되도록 해줍니다. 이 버튼은 alert창을 1번만 띄우고 더 이상 동작을 하지 않는 것 이지요. (3번 라인의 prevent는 e.preventDefault() 처럼 기본 이벤트를 막아주기 때문에 `/달나라` 링크로 가지 않습니다. 이러한 수식어는 여러가지가 존재하고 있으니 한번쯤 공식 api를 살펴보시길 바랍니다.)

### 약어 사용
```html
<div id="app">
    <button @click.once="myClickEvent">이벤트 바인딩 1( once )</button><br/><br/>
    <a href="/달나라" @click.prevent="myClickEvent">이벤트 바인딩 2( prevent )</a>
    <div class="mouse-area" @mouseEnter="areaEnter" @mouseLeave="areaLeave">
        {{ areaState }}
    </div>
</div>
```
`@`를 사용하면 계속 v-on 을 타이핑 할 필요가 없어집니다. 저는 약어 사용이 더 편하기때문에 이 후 예제에서는 약어로 사용하겠습니다.


## 속성 바인딩 v-bind
```html
<div id="app">
    <img v-bind:src="myImage">
    <p v-bind:class="[italicFont, { red : isRed }]">
        흐으음~
    </p>
    <button @click="()=>{this.isRed = !this.isRed}">색칠!</button>
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        myImage: 'http://placehold.it/120x120?text=image',
        italicFont: 'italic',
        isRed: false
    }
});
```
<p data-height="300" data-theme-id="11131" data-slug-hash="ZyVaVv" data-default-tab="result" data-user="small" data-embed-version="2" data-pen-title="ZyVaVv" class="codepen">See the Pen <a href="https://codepen.io/small/pen/ZyVaVv/">ZyVaVv</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

v-bind 디렉티브는 html 요소들의 속성들을 동적으로 바인딩을 해주는 기능입니다. 예제를 살펴보면 myImage라는 이미지 경로의 string 값을 src 속성으로 바인딩 해주었습니다. 다음으로 p 태그를 살펴보면 Array와 Object 를 사용하여서 동적으로 클래스를 바인딩 해주었습니다. 배열의 각 값들을 해당 html 요소의 클래스로 부여합니다. 배열이 아닌 객체 형태는  `{ className: Boolean }` 형태를 취하며 값인 Boolean이 true를 가진다면 해당 className을 html 요소에 부여합니다. 예제에서의 Boolean영역에 위치한 isRed는 처음에는 false여서 red라는 클래스를 주지 않았지만 아래의 버튼으로 isRed값을 true로 만들면 red 라는 클래스가 추가되는 것을 확인할 수 있습니다.

### 약어 사용
```html
<div id="app">
    <img :src="myImage">
    <p :class="[italicFont, { red : isRed }]">
        흐으음~
    </p>
    <button @click="()=>{this.isRed = !this.isRed}">색칠!</button>
</div>
```
v-bind도 v-on과 마찬가지로 `:` 라는 약어로 사용할 수 있습니다.


## 인풋 데이터 바인딩 v-model
