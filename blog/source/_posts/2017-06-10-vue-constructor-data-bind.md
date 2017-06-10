---
title: Vue.js - 뷰 모델 생성과 데이터 바인딩
date: 2017-06-10 18:26:31
banner:
    url: https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/480px-Vue.js_Logo.svg.png?uselang=ko
categories:
    - Javascript
    - vue
tags:
    - javascript
    - vue
    - vue js
    - data bind
---
[link1]: https://kr.vuejs.org/v2/api/#옵션-데이터
## 뷰 모델 생성
ViewModel을 생성하는 방법은 간단합니다. 전역에 부여되는 `Vue` 생성자로 생성한 인스턴스가 ViewModel이 됩니다. 인스턴스를 생성할 때 여러 옵션을 넘겨 줄 수 있는데 이번 예제로 어떠한 옵션들이 있는지 살펴보고자 합니다.

사전 준비 작업은 진행하지 않겠습니다. (파일에 cdn 으로 스크립트 한 줄 추가 해주세요.)

- script

```javascript
var app = new Vue({
    el: '#app', // 마운트 할 DOM 엘리먼트
    data: {
        text: 'My Text',
        componentText: 'Hi ??'
    },
    methods: { // 기능 메서드 그룹
        changeText: function() {
            // this가 app 인스턴스로 사용되기 위해 화살표 함수를 사용하면 안됩니다.
            this.text = 'My Changed Text'
        }
    },
    computed: {
        // 의존하고 있는 반응형 속성(data 객체)이 변경될 때 마다 다시 초기화 됩니다.
        otherText: function() {
            // 마찬가지로 화살표 함수를 사용하면 안됩니다.
            return this.text + ', yeah!!' // this.text 의존
        }
    },
    components: { // component 그룹, #app 에서만 사용 가능한 child component
        'test-component': {
            // this.$parent로 부모 인스턴스에 접근 합니다.
            template: '<p><i>{{this.$parent.componentText}}</i></p>'
        }
    }
});
```

- html

```html
<div id="app"> <!-- el 부분 -->
    {{text}} <!-- data binding은 머스타치 템플릿 구문 사용 -->
    <test-component></test-component>
    {{otherText}} <!-- computed 되고 있는 데이터 -->
　
    <!-- 메서드의 changeText를 v-on디렉티브를 이용하여 바인드, @click="changeText"로 축약 가능 -->
    <button v-on:click="changeText">버튼!</button>
</div>
```

- 결과 화면

<p data-height="300" data-theme-id="11131" data-slug-hash="WOrqLM" data-default-tab="result" data-user="small" data-embed-version="2" data-pen-title="WOrqLM" class="codepen">See the Pen <a href="https://codepen.io/small/pen/WOrqLM/">WOrqLM</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

주석으로 간단하게나마 설명을 달아두었습니다만 한번 더 천천히 살펴보겠습니다.

- el: 해당 인스턴스를 `마운트 할 DOM을 선택`합니다. 이는 new를 사용하여 인스턴스를 생성할 경우에만 사용됩니다. (다른 경우는 뒤에서)

- data: 해당 인스턴스의 데이터 객체입니다. `기본 객체` 형태여야만 하며 인스턴스화 하면서 이 속성들을 `반응형`으로 만들어줍니다. 반응형이라는 시스템은 Vue.js에서 굉장히 중요한 요소입니다. 현재는 해당 속성이 변경되면 내부에서 이를 감지하여 다시 화면에 랜더링 해준다는 정도만 기억 해둡시다. 콘솔창을 열어서 `app.text = 'some text';`라고 입력해 봅시다. 어떤 의미인지 이해 되실거라고 생각됩니다. 자세한 내용은 뒤에서 따로 정리를 해보도록 할 예정입니다.

- methods: 메서드들을 정의하는 객체 입니다. 인스턴스를 통해 직접 접근하거나( 콘솔에서 app.changeText(); ) 혹은 `v-on`이라는 디렉티브를 이용하여 사용할 수 있습니다.

- computed: computed의 속성들은 `data의 속성들에 의존`합니다. data의 속성이 바뀔 때 마다 이를 의존하고 있는 속성은 계속 업데이트 될 것 입니다. 버튼을 클릭하여 text 라는 데이터를 변경하면 이를 의존하고 있는 otherText도 같이 변경되는 것을 볼 수 있습니다.

- components: 해당 인스턴스에서 사용할 수 있는 **컴포넌트를 정의** 합니다. `el속성의 영역에서만 사용 가능`합니다. (Vue.component()를 사용하여 전역으로도 컴포넌트 생성이 가능합니다.)

자주 사용되는 옵션들 중 몇가지를 살펴 보았습니다. 설명을 진행하다보니 **뒤에서 라는 말 혹은 예제에 언급되지 않은 문법** 등이 설명 중간중간에 섞여 있습니다. 현재 모든 것을 다 설명하기에는 너무나도 큰 영역이기 때문에 현재는 이 정도의 이해만을 목표로 해도 괜찮습니다. Vue.js가 어떤 흐름으로 동작하는지, 어떠한 특성을 가지고 있는지 단편적으로 살펴 보기에는 충분할 것이라 생각 합니다. 다음에는 디렉티브(지시자)라는 것에 대해서 알아보려고 합니다. 이번 예제에서는 이벤트에 관련된 디렉티브가 등장했었는데요. 이를 보면 디렉티브란 것이 DOM 요소와 관련된 문법 이라는 것을 추측할 수 있습니다.
