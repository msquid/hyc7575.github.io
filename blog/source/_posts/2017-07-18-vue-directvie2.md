---
title: Vue.js - Directive(지시자) 2/2
date: 2017-07-18 14:35:38
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

이번 2장에서 아직 다루지 않은 디렉티브들을 살펴볼 예정입니다. ( 요즘 프로그래밍 외 적으로 하고 있는 게 많아서 포스팅이 순위에서 많이 밀리네요 ㅠ )

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
```html
<div id="app">
    <section>
        <h1>textarea or input value</h1>
        <textarea type="text" v-model="msg" placeholder="줄바꿈은 enter"></textarea>
        <h2>입력값 :</h2>
        <p>{{msg}}</p>
    </section>
    <section>
        <h1>checkbox or radio</h1>
        <input id="check1" type="checkbox" v-model="items" value="아이템1"/>
        <label for="check1">아이템1</label><br/>
        <input id="check2" type="checkbox" v-model="items" value="아이템2"/>
        <label for="check2">아이템2</label><br/>
        <input id="check3" type="checkbox" v-model="items" value="아이템3"/>
        <label for="check3">아이템3</label><br/>
        <input id="check4" type="checkbox" v-model="items" value="아이템4"/>
        <label for="check4">아이템4</label><br/>
        <input id="check5" type="checkbox" v-model="items" value="아이템5"/>
        <label for="check5">아이템5</label>
        <h2>체크 아이템 : </h2>
        {{items}}
    </section>
    <section>
        <h1>select</h1>
        <select v-model="selectItem">
            <option value="셀렉트a">A</option>
            <option value="셀렉트b">B</option>
            <option value="셀렉트c">C</option>
        </select>
        <h2>선택 값 : </h2>
        {{selectItem}}
    </section>
    <button id="getData" @click="getCurrentData">get current data</button>
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        msg: '',
        items: [], // 단일의 checkbox의 경우는 array가 아닌 boolean 값을 사용합니다.
        selectItem: '샐렉트a'
    },
    methods: {
        getCurrentData: function() {
        alert(`
msg: ${this.msg}
items: ${this.items}
selectItem: ${this.selectItem} `);
        }
    }
});
```
<p data-height="347" data-theme-id="11131" data-slug-hash="XgoZjb" data-default-tab="result" data-user="small" data-embed-version="2" data-pen-title="XgoZjb" class="codepen">See the Pen <a href="https://codepen.io/small/pen/XgoZjb/">XgoZjb</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

이전까지 살펴 보았던 예제들은 모두, vue 인스턴스가 가지고 있는 data를 `단방향`으로 바인딩을 해주었다면 이제부터는 v-model을 사용하여 data를 `양방향`으로 바인딩 할 수 있도록 해줍니다. 만약 잘 이해가 가지 않는다면 예제의 값들을 변경 해보고 우측 하단의 버튼을 클릭해봅시다. 이전까지의 예제는 특정 이벤트를 발생시켜 data를 변경해왔지만 view의 form elements 들을 이용하여 data들을 변경할 수 있는 사실을 알 수 있습니다.

## v-pre, v-cloak, v-once
<p data-height="300" data-theme-id="11131" data-slug-hash="zzQzOV" data-default-tab="html,result" data-user="small" data-embed-version="2" data-pen-title="zzQzOV" class="codepen">See the Pen <a href="https://codepen.io/small/pen/zzQzOV/">zzQzOV</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

- v-pre는 `{% raw %}{{}}{% endraw %}`인 머스타치 구문을 랜더링 하지 않고 보여주기 위한 디렉티브 입니다. (html의 pre태그 혹은 css의 white-spce: pre | pre-line 을 생각하면 될 것 같습니다.)
- v-once는 데이터를 단 1번만 랜더링을 해주는 디렉티브입니다. 예제의 증가버튼을 눌러도 `초기 num`은 v-once로 설정되었기 때문에 값이 다시 바인딩되지 않습니다. 이는 업데이트 성능을 최적화 하는데 사용한다고 합니다.
- v-cloak은 Vue인스턴스가 컴파일이 완료될때 까지 elements 들에 남아있다가, 컴파일이 완료되면 사라집니다. 컴파일이 완료되지 않은 상태에서는 머스타치 구문이 그대로 노출되기때문에 완료될때 까지 숨겨줄 필요성이 있습니다. 단 아래와 같은 css 구문이 필요합니다.
```css
[v-cloak] {
    display: none;
}
```

지금까지 Vue.js의 디렉티브들을 살펴보았습니다.
