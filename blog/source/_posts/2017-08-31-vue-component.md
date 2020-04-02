---
title: Vue.js - Component(컴포넌트) 1
tags:
  - javascript
  - vue
  - vue js
  - directive
  - 디렉티브
  - 지시자
banner:
  url: >-
    https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png
categories:
  - Javascript
  - vue
published: true
date: 2017-08-31 14:04:42
---
이미지 출처(https://vuejs.org/images/logo.png)


컴포넌트라 함은 웹 어플리케이션을 구성하는 하나하나의 부품입니다. Vue.js에서는 이 컴포넌트를 가장 강력한 기능 중 하나라고 소개하고 있습니다. 컴포넌트란 무엇인가 이런 자세한 설명은 생략하고 Vue.js에서 컴포넌트를 사용하는 방법을 바로 알아보도록 하겠습니다.

## 컴포넌트 등록
```html
<div id="app">
    <test-component></test-component>
    <test-component></test-component>
</div>
```
```javascript
// 전역 컴포넌트 생성
Vue.component('test-component', {
    template: '<p>테스트용 컴포넌트 생성</p>'
});
new Vue({
    el: '#app'
});
```

<p data-height="300" data-theme-id="11131" data-slug-hash="NveaEd" data-default-tab="js,result" data-user="small" data-embed-version="2" data-pen-title="NveaEd" class="codepen">See the Pen <a href="https://codepen.io/small/pen/NveaEd/">NveaEd</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

`Vue.component`를 사용하여 전역 컴포넌트를 등록하면 Vue 인스턴스 내부 어디서든 해당 컴포넌트를 사용할 수 있게 됩니다. 이때 주의할 점은 컴포넌트가 사용되는 영역의 Vue 인스턴스화를 하기 전 컴포넌트를 등록해야 합니다. 이 예제에서는 test-component를 만들었고 특정 문장을 나타내는 기능을 하고 있습니다. 해당 컴포넌트를 2번 사용하였기에 일치하는 특정 문장이 2번 랜더링 되게 되었습니다.

## 컴포넌트 등록(지역)
```html
<div id="app">
    <test-component></test-component>
</div>
<div id="ohterApp">
    <test-component></test-component>
</div>
```
```javascript
// 전역 컴포넌트 생성
var testComponent = {
    template: '<p>테스트용 컴포넌트 지역 생성</p>'
}
new Vue({
    el: '#app',
    components: {
        'test-component': testComponent
    }
});
new Vue({
    el: '#otherApp'
})
```
<p data-height="290" data-theme-id="11131" data-slug-hash="XaGZRN" data-default-tab="js,result" data-user="small" data-embed-version="2" data-pen-title="XaGZRN" class="codepen">See the Pen <a href="https://codepen.io/small/pen/XaGZRN/">XaGZRN</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

`components`속성을 사용하여 컴포넌트를 해당 지역에서만 사용 가능하도록 등록할 수 있습니다. 예제는 test-component를 감싸고 있는 각각의 div에 한 번씩 사용하였지만 id가 app인 div내부에서만 test-component를 랜더링 하고 있는 것을 보여주고 있습니다.


## 컴포넌트 데이터 바인딩, 메서드 사용하기
```html
<div id="app">
    <test-component></test-component>
    <test-component></test-component>
    <test-component></test-component>
</div>
```
```javascript
Vue.component('test-component', {
    template: '<button @click="increment">{{count}}</button>',
    data: function() {
        return {
            count: 0
        }
    },
    methods: {
        increment: function () {
            this.count += 1
        }
    }
});

var app = new Vue({
    el: '#app'
});
```
<p data-height="300" data-theme-id="11131" data-slug-hash="eEXVON" data-default-tab="js,result" data-user="small" data-embed-version="2" data-pen-title="eEXVON" class="codepen">See the Pen <a href="https://codepen.io/small/pen/eEXVON/">eEXVON</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

컴포넌트의 데이터는 `data`에서 관리합니다. 여기서 중요한 점은 이 data 속성은 이전처럼 객체가 아닌 함수여야 한다는 것입니다. 이는 컴포넌트마다 각각 자신의 상태를 가질 수 있게 하기 위함이라고 합니다. 이제 버튼을 클릭하면 increment 메서드가 실행되며 해당 버튼의 count 상태를 업데이트합니다.

## Props
Vue.js 포스팅을 시작할 때 React 와 비슷한 느낌을 받았다는 말을 언급한 적이 있었습니다. 그 이유 중 큰 비중을 차지한 것이 Vue.js에서도 Props를 이용하여 하위 컴포넌트로 데이터를 전달해주기 때문입니다. Props를 사용하는 방법을 알아보도록 합니다.

```html
<div id="app">
    <test-component id="abk1341madgamlvba" :age="30"></test-component>
    <p>
        콘솔창을 열어 경고를 확인해봅시다.
    </p>
</div>
```

```javascript
Vue.component('test-component', {
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: 'noname'
        },
        age: {
            type: Number,
            validator: function(v) {
            	return v >= 50;
            }
        }
    },
    template: '<p>name: {{name}}, age: {{age}}</p>'
});
new Vue({
    el: '#app'
});
```
<p data-height="355" data-theme-id="11131" data-slug-hash="EvMLYJ" data-default-tab="js,result" data-user="small" data-embed-version="2" data-pen-title="EvMLYJ" class="codepen">See the Pen <a href="https://codepen.io/small/pen/EvMLYJ/">EvMLYJ</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

props 프로퍼티로 전달받을 것으로 예상되는 데이터를 정의합니다. 타입 체크는 필수는 아니지만 원활한 개발을 위해 사용하시기를 권장합니다. 그리고 props를 받아오는 로직은 상위 컴포넌트에서 넘겨줍니다.

예제를 살펴봅시다.
type은 instanceof를 사용하여 클래스 타입을 체크합니다. `[String, Number]`처럼 배열을 사용하면 여러 가지 타입을 설정도 가능합니다. required는 필수 값 여부를 설정하고 name props의 default는 값이 들어오지 않을 경우 기본으로 사용되는 값을 의미합니다. 예제의 결과로써 noname이 표현된 이유이기도 합니다.
validator는 age 값을 받아와 특정 조건을 만족하는지 안 하는지 체크하고 `false를 반환한다면 경고`를 나타내 줍니다. 예제에서는 30이라는 값이 들어왔지만 validator의 조건을 만족하지 못하여 콘솔에 경고를 표시해주고 있습니다.

ps - 마크업 부분을 살펴보면 `:age (v-bind:age)`를 사용한 것 을 볼 수 있습니다. 이는 값이 String 형태로 넘어가는 것을 방지해준 것입니다.
