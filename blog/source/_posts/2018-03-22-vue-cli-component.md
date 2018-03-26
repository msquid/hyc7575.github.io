---
title: Vue.js - Vue-cli를 이용한 vue 프로젝트 살펴보기 2
tags:
  - javascript
  - vue
  - vue js
  - vue-cli
  - vue project
  - vue component
banner:
  url: >-
    https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/480px-Vue.js_Logo.svg.png?uselang=ko
categories:
  - Javascript
  - vue
published: true
date: 2018-03-22 17:18:37
---

## 컴포넌트 사용하기
[이전 글](/2017/12/21/2017-12-21-vue-prject-example/)에서 예제로 사용한 카운트 앱을 통하여 학습해봅시다.
카운트 앱을 2가지로 분리할 예정입니다.
- Count
    - CountValue
    - CountController

첫째로 value가 표시되는 영역, 두번째로 value값을 조정하는 영역입니다.


기존 예제 ( App.vue )
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
```

위와 같던 예제를...
```html
<template lang="html">
    <div id="wrap">
        <Count />
    </div>
</template>
　
<script>
import Count from './containers/count';
　
export default {
    components: {
        Count
    }
}
</script>
```
이렇게 만들 예정입니다. 일단 App.vue 를 위처럼 수정해주세요.

## Directory
컴포넌트와 컨테이너를 담을 폴더들을 생성합니다. 전체적인 디렉토리 구조는 아래와 같이 작성하였습니다.

- app
    - node_modules
    - src
        - assets
        - `components`
            - `countValue.vue`
            - `countController.vue`
        - `containers`
            - `count.vue`
        - App.vue
        - main.js
    - index.html
    - package.json
    - etc...

강조된 부분이 기존 vue-cli에서 생성해주지 않은 부분으로 직접 생성해야하는 폴더, 파일 입니다.

## 컴포넌트 작성
Count 라는 컨테이너(page)부터 살펴보도록 합시다.
Count 앱의 모든 기능은 이 컨테이너 안으로 들어가져 있습니다.

### count.vue
```html
<template lang="html">
    <div>
        <countValue :cv="num"/>
        <countController @increment="increment" @decrement="decrement"/>
    </div>
</template>
　
<script>
import countValue from '../components/countValue';
import countController from '../components/countController';
　
export default {
    components: {
        countValue,
        countController
    },
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
```

13번 라인을 보면 `components`가 있습니다.
이는 이 count라는 컨테이너에서 사용할 컴포넌트들을 정의하는 부분입니다.
윗줄에서 import로 불러온, countValue와 countController 2가지의 컴포넌트들을 사용한다고 정의한 것이지요.

정의한 컴포넌트들은 html 영역인 template에서 사용됩니다.
3, 4번 라인이 해당하는 부분입니다.
중요한 내용은 아니지만, 저는 camel case(대문자로 연결) 방식을 사용하였으나 kebab case(하이픈으로 연결)를 권장한다는 글을 본거 같아서 언급해봅니다.

다시 예제의 컴포넌트를 봅시다.
현재 카운트 앱의 데이터 및 행동들은 모두 count라는 컨테이너가 가지고 있습니다. 우리는 이것들을 각 자식 컴포넌트에게 `props`를 통하여 넘겨주어야 합니다.

3번 라인, `:cv="num"` cv라는 이름으로 num 데이터를 자식 컴포넌트에게 넘겨주고 있습니다. 자식 컴포넌트인 countValue는 cv를 props를 통하여 받아와야 합니다.

### countValue.vue
```html
<template lang="html">
    <span>{{cv}}</span>
</template>
　
<script>
export default {
    props: ['cv']
}
</script>
```
[Vue.js - Component(컴포넌트) 1](/2017/08/31/2017-08-31-vue-component/) 에서 설명했던 props 사용법과 동일합니다.


이제 count.vue의 4번라인을 봅시다.
이 부분도 이전에 설명했던 부분입니다. [Vue.js - Component(컴포넌트) 2 - 부모 자식간 통신](/2017/11/13/2017-11-13-vue-component2/#부모-자식간-통신)의 예제에서 언급했던 기능이지요.
컴포넌트를 통해 커스텀 이벤트를 정의한 뒤, 자식 컴포넌트에서 `$emit`을 사용하여 부모의 이벤트를 발생시키는 방법입니다.

### countController.vue
```html
<template lang="html">
    <div>
        <button @click="increment">증가</button>
        <button @click="decrement">감소</button>
    </div>
</template>
　
<script>
export default {
    methods: {
        increment() {
            // 부모의 increment라는 이벤트 호출
            this.$emit('increment');
        },
        decrement() {
            // 부모의 decrement 이벤트 호출
            this.$emit('decrement');
        }
    }
}
</script>
```

싱글 파일 컴포넌트를 사용한 Vue 앱을 만들어보았습니다.

## 마침
포스트도 오랜만이고, 글을 며칠을 나누어 쓰다 보니, 앞뒤의 내용도 헷갈리고 많이 어렵네요. ㅠ
그래도.. 현재 포스트까지의 내용을 이해하실 수 있다면 다른 vue를 사용하여 여러 가지 시도를 해보시기 충분하지 않을까 합니다.
앞으로 Router와 Vuex를 활용하는 방법까지 배우신다면 실무에서도 무리가 없지 않을까 생각해봅니다.
