---
title: Vue.js - Component(컴포넌트) 2
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
published: true
date: 2017-11-13 17:32:25
---
지난 시간에 이어 컴포넌트를 사용하는 몇가지 방법을 더 알아보고자 합니다.
조금 더 쉽게 템플릿을 만드는 방법과 각 컴포넌트의 통신 방법을 예제를 들어 설명 하도록 하겠습니다.

## 컴포넌트 template
```html
<div id="app">
    <test-component></test-component>
    <test-component></test-component>
    <test-component></test-component>
</div>
　
<template id="templateId">
    <div>
        {{text}}
    </div>
</template>
```

```javascript
Vue.component('test-component', {
    template: '#templateId',
    data: function() {
        return {
            text: '이곳에 컴포넌트의 마크업을 진행!!'
        }
    }
});
var app = new Vue({
    el: '#app'
});
```
`template` 기능을 이용하면 복잡한 마크업의 컴포넌트를 생성할 수 있습니다.
사용방법은 위 예제와 같이 `template: '#templateId'` 형태로 html의 template 태그의 id와 template 속성의 값을 매핑 시켜줍니다. 템플릿 내부는 기존 배워왔던 Vue.js의 문법과 동일하게 사용 가능합니다.

## 부모 자식간 통신
```html
<div id="app">
    <parent></parent>
</div>
　
<template id="parent">
    <child @eat="parentEat" :parent-calorie="calorie"></child>
</template>
　
<template id="child">
    <div>
        <p>parent 먹은 칼로리 : {{parentCalorie}}</p>
        <p>child 먹은 칼로리 : {{calorie}}</p>
        <button @click="childEat">밥먹자!</button>
    </div>
</template>
```

```javascript
Vue.component('parent', {
    template: '#parent',
    data: function() {
        return {
            calorie: 0
        }
    },
    methods: {
        parentEat: function() {
            this.calorie += 800;
        }
    }
});
Vue.component('child', {
    template: '#child',
    props: ['parentCalorie'],
    data: function() {
        return {
            calorie: 0
        }
    },
    methods: {
        childEat: function () {
            this.calorie += 500;
            this.$emit('eat');
        }
    }
});
var app = new Vue({
    el: '#app'
});
```
<p data-height="300" data-theme-id="11131" data-slug-hash="EbmrOB" data-default-tab="js,result" data-user="small" data-embed-version="2" data-pen-title="EbmrOB" class="codepen">See the Pen <a href="https://codepen.io/small/pen/EbmrOB/">EbmrOB</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

기본적으로 데이터는 부모에서 자식으로 향하는 단방향 데이터 흐름을 가지고 있습니다.
위 예제는 자식 컴포넌트에서 부모의 데이터를 수정하는 예제입니다.

자식은 1끼에 500 칼로리를 섭취하지만 부모는 1끼에 800칼로리를 섭취합니다. 각각 부모와 자식은 칼로리라는 데이터를 가지고 있으며 자식이 밥을 먹을때만 부모도 함께 먹습니다.

밥을 먹는 이벤트를 발생시키는 트리거(버튼)는 자식이 가지고 있습니다. 이 트리거는 childEat라는 메서드를 실행 시켜줍니다. 이 메서드는 자식의 칼로리를 500 증가시켜주며 `$emit()`을 사용하여 `eat`이라는 이벤트를 발생시킵니다. eat은 child 컴포넌트를 사용(?)하는 부분에서 찾아볼 수 있습니다.

`@eat="parentEat"` 이런식으로 말이지요.

eat이라는 이벤트가 감지(발생)되면 parentEat이라는 메서드를 실행하게 되는 것 이지요.
이 parentEat은 부모의 칼로리를 800 증가 시켜줍니다. 이로써 자식 컴포넌트에서 부모의 데이터를 접근 할 수 있게 되었습니다.

이해가 잘 안된다면 아래 이미지를 한번 살펴봅시다.
![부모자식통신](https://user-images.githubusercontent.com/14171723/32719286-3dcdc840-c8a3-11e7-9c7e-8e8652b832a3.png)

## 컴포넌트 간 통신
부모와 자식이 아닌 관계에서도 컴포넌트간의 통신이 필요할 때 가 있을 수 있습니다. 다음 예제는 빈 Vue 인스턴스를 이벤트 버스로 이용한 예제 입니다.

```html
<div id="app">
    <component1></component1>
    <component2></component2>
</div>
<template id="c1">
    <div>
        <input type="text" v-model="text">
        <button @click="sendData">컴포넌트 1 버튼</button>
    </div>
</template>
```

```javascript
Vue.component('component1', {
    template: '#c1',
    data: function() {
        return {
            text: ''
        }
    },
    methods: {
        sendData: function() {
            eventBus.$emit('send', this.text);
        }
    }
});
Vue.component('component2', {
    template: '<p>{{text}}</p>',
    data: function() {
        return {
            text: ''
        }
    },
    methods: {
        showText: function(t) {
            this.text = t
        }    
    },
    created: function() {
        eventBus.$on('send', this.showText);
    }
});
var eventBus = new Vue(); // 이벤트 버스
var app = new Vue({
    el: '#app'
});
```

<p data-height="300" data-theme-id="11131" data-slug-hash="BmREmB" data-default-tab="js,result" data-user="small" data-embed-version="2" data-pen-title="BmREmB" class="codepen">See the Pen <a href="https://codepen.io/small/pen/BmREmB/">BmREmB</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

input에 값을 입력 후 버튼을 눌러봅시다. input에 들어간 값이 텍스트로 출력 되는 것을 확인 할 수 있습니다.
이 방식 또한 위의 부모 자식간의 통신과 비슷합니다.

컴포넌트1에서 `$emit()` 을 이용하여 이벤트 트리거를 생성 한 후 컴포넌트2 에서 `$on()`을 이용하여 이벤트를 감지하는 방법입니다. 단지 전역에 있는 eventBus라는 통로를 이용한다는 점이 다를 뿐 이지요.
