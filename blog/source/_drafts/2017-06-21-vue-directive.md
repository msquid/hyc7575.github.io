---
title: Vue.js - Directive(지시자) 1/2
banner:
    url: https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/480px-Vue.js_Logo.svg.png?uselang=ko
categories:
    - Javascript
    - vue
tags:
    - javascript
    - vue
    - vue js
    - directive
    - 디렉티브
    - 지시자
---

디렉티브란 Vue.js 에서 사용되는 특별한 속성 입니다. Angular1 을 사용해보셨던 분들은 익숙할 것 입니다. Angular에서 `ng-` 를 사용한다면 Vue 에서는 `v-` 라는 접두사를 사용합니다. 이번 포스팅에서는 Vue.js 에서 기본적으로 제공하는 디렉티브 몇가지를 알아보려고 합니다.

## v-text와 v-html

```html
<div id="app">
    {{text}}
    <p v-text="text"></p> <!-- {{text}} 와 동일 -->
    <p v-html="htmlText"></p>
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        text: '안녕안녕~',
        htmlText: '<span style="color: red">하이하이~</span> !!'
    }
});
```

<p data-height="300" data-theme-id="11131" data-slug-hash="KqmeoZ" data-default-tab="result" data-user="small" data-embed-version="2" data-pen-title="KqmeoZ" class="codepen">See the Pen <a href="https://codepen.io/small/pen/KqmeoZ/">KqmeoZ</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

- v-text: `{% raw %}{{ }}{% endraw %}` 와 같은 기능을 합니다. 해당 엘리먼트의 값이 data의 text 값으로 설정 된 것을 볼 수 있습니다.

- v-html: html 코드를 랜더링 할 경우 사용합니다. v-text나 머스타치 구문을 사용할 경우 해당 string값 그대로 표시됩니다.

## v-show와 v-if

```html
<div id="app">
    <section>
        <h1>v-show</h1>
        <span v-show="isShow">{{text}}</span>
    </section>
    <section>
        <h1>v-if</h1>
        <span v-if="isShow">{{text}}</span>
    </section>
    <button @click="toggleText">토글</button> <!-- 이벤트 바인딩 -->
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        isShow: false,
        text: '보일까 말까!'
    },
    methods: {
        toggleText: function() {
            this.isShow = !this.isShow;
        }
    }
});
```
v-show와 v-if 모두 화면에 표시하는지 안하는지에 대한 지시자 입니다.

- v-show: css의 display 속성에 의하여 컨트롤 됩니다. 값이 false여도 랜더링은 되지만  display: none 처리가 되어있는 것 입니다.

- v-if: 해당 엘리먼트의 랜더링 여부가 판단됩니다. 값이 false면 랜더링이 되지 않습니다. true라면 랜더링이 될 것이며 true에서 false로 변경될 때는 해당 엘리먼트가 삭제됩니다.

아래 이미지를 보면 v-if는 해당 엘리먼트가 랜더링 되지 않았고, v-show 경우 display: none 처리가 되어있는 것을 보실 수 있습니다.

![v-if](https://user-images.githubusercontent.com/14171723/27375487-5582b6dc-56aa-11e7-8426-d13e7ea241c3.png)

<p data-height="300" data-theme-id="11131" data-slug-hash="mwmzRd" data-default-tab="result" data-user="small" data-embed-version="2" data-pen-title="mwmzRd" class="codepen">See the Pen <a href="https://codepen.io/small/pen/mwmzRd/">mwmzRd</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### v-if의 else

if문이 있으니 else 와 else if도 자연스럽게 따라오게 됩니다.

```html
<div id="app">
    <p v-if="state === 0">
        if 입니다.
    </p>
    <p v-else-if="state === 1">
        else if 입니다.
    </p>
    <p v-else>
        else 입니다.
    </p>

    <button @click="changeState">토글</button>
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        state: 0
    },
    methods: {
        changeState: function() {
            // 0 ~ 2 랜덤 부여
            var state = parseInt(Math.random() * 3, 10);
            alert(state);
            this.state = state;
        }
    }
});
```

<p data-height="300" data-theme-id="11131" data-slug-hash="MomzyZ" data-default-tab="result" data-user="small" data-embed-version="2" data-pen-title="MomzyZ" class="codepen">See the Pen <a href="https://codepen.io/small/pen/MomzyZ/">MomzyZ</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

바로 v-else-if와 v-else는 `바로 이전 형제엘리먼트가 v-if` 일 경우 사용한다는 점만 기억해두시면 됩니다. ( 우리가 아는 if와 같습니다! )

## v-for 디렉티브

```html
<div id="app">
    <h1>v-for example</h1>
    <div class="array-area">
        <h2>array</h2>
        <p v-for="(item, index) in arrayItem">{{index}} : {{item}}</p>
    </div>
    <div class="obj-area">
        <h2>object</h2>
        <dl>
            <template v-for="(item, key, index) in objItem">
                <dt>{{key}}</dt>
                <dd>{{item}}</dd>
            </template>
        </dl>
    </div>
    <div class="num-area">
        <h2>number</h2>
        <p v-for="n in 7">{{n}}</p>
    </div>
    <div class="string-area">
        <h2>string</h2>
        <p v-for="s in text">{{s}}</p>
    </div>
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        arrayItem: ['arr1', 'arr2', 'arr3', 'arr4'],
        objItem: {
            name: 'hyeok',
            age: 22,
            job: 'front end developer',
            birthday: '0927'
        },
        text: '안녕해요!'
    }
});
```

<p data-height="300" data-theme-id="11131" data-slug-hash="gRRgzX" data-default-tab="result" data-user="small" data-embed-version="2" data-pen-title="gRRgzX" class="codepen">See the Pen <a href="https://codepen.io/small/pen/gRRgzX/">gRRgzX</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

v-for디렉티브는 굉장히 자주 사용되는 디렉티브 중 하나 입니다. 이 디렉티브는 기본적으로 `alias in(of) expression` 문법을 사용하며 expression자리에는 뷰모델의 데이터 들 중 Array, Object, Number, String 형태를 가진 값들이 올 수 있습니다.

- Array: 배열을 순환하며 alias 에 해당 인덱스의 값을 부여합니다. `(alias, index) in expression` 형태로 변경하여 인덱스 값 또한 넘겨받을 수 있습니다.

- Object: 배열과 마찬가지로 객체를 순환합니다. 순환 순서는 Object.keys()로 나열된 키의 순서로 결정됩니다. `(alias, key, index) in expression` 형태로 사용이 가능합니다.

- Number: expression의 값 만큼 순환하며 그 값은 1부터 시작합니다.

- String: 문자열을 한자 한자 쪼개 한 단어씩 순환하며 표기합니다.

## 참고
- [Vue 디렉티브](https://kr.vuejs.org/v2/api/#디렉티브)
