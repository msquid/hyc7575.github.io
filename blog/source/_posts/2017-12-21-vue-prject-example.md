---
title: Vue.js - Vue-cli를 이용한 vue 프로젝트 살펴보기 1
tags:
  - javascript
  - vue
  - vue js
  - vue-cli
  - vue project
banner:
  url: >-
    https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/480px-Vue.js_Logo.svg.png?uselang=ko
categories:
  - Javascript
  - vue
published: true
date: 2017-12-21 11:52:54
---

이번에는 vue-cli가 만들어준 Vue 프로젝트를 살펴보도록 하겠습니다.
그전에 한가지 짚고 가야 할 점이 있습니다.

vue-cli는 각 컴포넌트를 `.vue` 확장자를 가진 `싱글 파일 컴포넌트`로 만들어주기 때문에 지금부터는 기존까지의 Vue 코딩 방식과는 다른 방식으로 코딩하겠습니다.
문법 자체는 거의 동일하다보니 큰 문제없이 잘 진행할 수 있을 것입니다.


## 싱글 파일 컴포넌트

그래서 싱글 파일 컴포넌트가 무엇 인가?
.vue 확장자를 파일을 Webpack 또는 Browserify와 같은 도구를 이용하여 빌드하여 Vue.js를 사용하는 것 입니다.
우리가 만든 app이라는 프로젝트의 `/src/App.vue`를 살펴봅시다.
```html
<template>
<div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
        <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
        <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
        <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
        <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
</div>
</template>
　
<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>
　
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
　
h1,
h2 {
    font-weight: normal;
}
　
ul {
    list-style-type: none;
    padding: 0;
}
　
li {
    display: inline-block;
    margin: 0 10px;
}
　
a {
    color: #42b983;
}
</style>
```
마크업과 스크립트 그리고 css를 모두 한 파일에 작성합니다.

### template
해당 컴포넌트의 마크업을 작성하고 스크립트에서 설정한 데이터 및 메서드 등을 연결시켜 줍니다.

### script
컴포넌트의 데이터, 메서드, 라이프사이클 등 이전 까지 Vue 생성자에서 사용한 부분들을 이곳에서 작성합니다. 그리고 만들어진 컴포넌트를 반환해줍니다.

### style
해당 컴포넌트의 css를 정의합니다. 이 style태그에 `scoped` 라는 속성을 추가하면 해당 컴포넌트에 css가 종속됩니다.

앞으로는 이 싱글 파일 컴포넌트 방식으로 Vue 앱을 작성하겠습니다.

## 카운트 앱
App.vue의 모든 코드를 지우고 맛보기를 위해 간단한 카운트 앱을 만들어 보려 합니다.

```html
<template lang="html">
　
</template>
　
<script>
export default {
　
}
</script>
　
<style lang="css">
</style>
```

우선 기본 틀(?)을 생성 합시다.
(제가 사용하는 에디터는 Vue.js 관련된 문법 플러그인과 같은 기능을 추가하여서 단축키로 쉽게 기본 틀을 작성할 수 있습니다. 자신의 사용하는 에디터에서 한번 찾아보시는 것을 추천합니다.)

이제 카운트 앱의 기능을 생각 해봅시다.
카운트 앱은 기준이 되는 숫자, 증가 행위, 감소 행위가 있을 수 있습니다.

```html
<template lang="html">
    <div>
        <span>{{num}}</span>
    </div>
</template>
　
<script>
export default {
    data() {
        return {
            num: 0
        }
    },
    methods: {
        increment() {
            // 증가
            this.num++;
        },
        decrement() {
            // 감소
            this.num--;
        }
    }
}
</script>
　
<style lang="css">
</style>
```

한번 확인해 보시길 바랍니다. 기존 Vue.js와 거의 비슷하지요?
게다가 webpack에서 babel이 기본으로 셋팅되어 있어서 es5이상의 문법을 사용 할 수 있습니다.

자 이제 데이터와, 기능(메서드)를 만들었으니 이벤트를 연결 합니다. 이 또한 기존 Vue.js와 동일합니다.
```html
<template lang="html">
    <div>
        <div>
            <span>{{num}}</span>
            <div>
                <button @click="increment">증가</button>
                <button @click="decrement">감소</button>
            </div>
        </div>
    </div>
</template>
```

카운트 앱의 모든 기능이 완성 되었습니다.
이제 `npm run dev`를 사용하여 실행해봅시다. 이미 실행 되어있다면 웹 페이지를 띄워봅시다. 기본적으로 핫 로딩을 지원하기 때문에 바로 적용되어 있을 것 입니다.

모든 기능이 잘 동작하는데 뭔가 조금 아쉽네요. 스타일을 입혀봅시다.

```html
<template lang="html">
    <div id="wrap">
        <div>
            <span>{{num}}</span>
            <div>
                <button @click="increment">증가</button>
                <button @click="decrement">감소</button>
            </div>
        </div>
    </div>
</template>
　
<script>
export default {
    data() {
        return {
            num: 0
        }
    },
    methods: {
        increment() {
            // 증가
            this.num++;
        },
        decrement() {
            // 감소
            this.num--;
        }
    }
}
</script>
　
<style lang="css">
*{margin: 0; padding: 0;}
html,body {height: 100%;}
#wrap {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
}
#wrap > div {
    text-align: center;
}
span {
    display: inline-block;
    margin-bottom: 10px;
    color: #53a9f9;
    font-size: 32px;
    font-weight: 700;
}
button {
    padding: 0 8px;
    min-width: 60px;
    height: 34px;
    line-height: 34px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    border-radius: 3px;
    background-color: #88c5ff;
}
</style>
```

이제 우리는 Vue.js 프로젝트 생성도 해보았고 하나의 앱을 만들어 보았습니다.
하지만 아직 모든 부분을 살펴본게 아니기 때문에 다음장까지는 이어서 vue-cli가 만들어준 프로젝트를 살펴보겠습니다.
