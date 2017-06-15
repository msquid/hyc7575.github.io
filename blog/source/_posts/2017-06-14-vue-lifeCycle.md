---
title: Vue.js - LifeCycle
date: 2017-06-14 09:44:26
banner:
    url: https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/480px-Vue.js_Logo.svg.png?uselang=ko
categories:
    - Javascript
    - vue
tags:
    - javascript
    - vue
    - vue js
    - LifeCycle
    - 라이프사이클
    - 생명주기
---
[link1]: https://vuejs.org/
[link2]: https://kr.vuejs.org/v2/guide/render-function.html

라이프사이클이란 Vue 생성자의 호출 시점부터 mount 되기까지, 나아가 destroy 되기까지의 특정 시점들에 실행되는 메서드들 입니다. 아래 그림의 붉은 테두리를 가진 기호들이 Vue.js의 라이프사이클의 각 실행 시점입니다. (Vue.js가 어떤 흐름으로 동작하는지도 잘 나타나 있어서 많은 도움이 됩니다.)

![life-cyle](https://user-images.githubusercontent.com/14171723/27110978-f53bed4c-50e7-11e7-97b0-266c2244487c.png)
출처 - [Vue.js 공식문서][link1]

위에서부터 아래로 쭉 실행됩니다. 흐름자체는 그림만으로도 충분히 이해가 가능할 것 이라고 생각합니다. 그러면 이제 각 라이프사이클 메서드들이 어떤 특징을 가지고 있는지 예제를 통하여 살펴봅시다.

## 예제
- html

```html
<div id="app">
    {{text}}
    <br/>
    <button @click="changeText">변경!!</button>
    <br/>
    <button @click="destroyApp">파괴!?</button>
</div>
```

- script

```javascript
var app = new Vue({
    el: '#app',
    data: {
        text: '안녕하세요~'
    },
    methods: {
        changeText: function() {
            this.text = '반갑습니다!'
        },
        destroyApp: function() {
            console.group('--- destroyApp method ---');
            console.log(this === app);
            console.log(this.$destroy());
            console.groupEnd();
        }
    },
    beforeCreate: function() {
        // 아직 데이터 및 이벤트 정의 안됨
        console.group('--- beforeCreate ---');
        console.log('text : ', this.text); // undefined
        console.groupEnd();
    },
    created: function() {
        // 데이터와 이벤트는 접근 가능하지만, 아직 마운트가 안되서 $el 접근 불가
        console.group('--- created ---');
        console.log('text : ', this.text); // 안녕하세요~
        console.log('element :', this.$el); // undefined
        console.groupEnd();
    },
    mounted: function() {
        // el에 접근이 가능합니다. 보통 여기서 초기 데이터를 불러오곤 합니다.
        // beforeMount 에서는 el 접근 불가합니다.
        console.group('--- mounted ---');
        console.log('element : ↓');
        console.log(this.$el); // object HTMLDivElement
        console.groupEnd();
    },
    beforeUpdate: function() {
        // data가 변경된 후 DOM 랜더링 직전에 실행 됩니다. 그로 인해 변경될 text data를 가지고 있는 것 입니다.
        console.group('--- beforeUpdate ---');
        console.log('before update : ', this.text); // 반갑습니다!
        console.groupEnd();
    },
    updated: function() {
        // DOM 랜더링이 끝난 후 실행됩니다. DOM 변경이 완료 된 후 특정 작업을 실행해야할 경우 이곳에..
        console.group('--- updated ---');
        console.log('updated : ', this.text); // 반갑습니다!
        console.groupEnd()
    },
    destroyed: function() {
        console.group('--- destroyed ---');
        console.log('watcher : ', this._watcher.active);
        this.text = '변해라 ㅠ 안변한다 ㅠ';
        console.groupEnd();
    }
});
```
<p data-height="300" data-theme-id="11131" data-slug-hash="awmZRa" data-default-tab="result" data-user="small" data-embed-version="2" data-pen-title="awmZRa" class="codepen">See the Pen <a href="https://codepen.io/small/pen/awmZRa/">awmZRa</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

아마 codepn을 embed해서 `현재 블로그 페이지의 콘솔`에서 제가 작성한 예제의 로그들이 나타날 것 입니다.(혹시 안나온다면 예제 복사하셔서 보시면 됩니다.. ㅠ)

![console](https://user-images.githubusercontent.com/14171723/27120796-e4b3309c-511f-11e7-9e63-49a6c96cc2b3.png)
`예제 실행 -> 변경 버튼 클릭 -> 파괴 버튼 클릭`을 한 모습입니다.
- beforeCreate : 해당 영역에서는 data의 text를 접근할 수 없었습니다. 해당 시점에서는 아직 어떠한 설정이 되지 않았기 때문에 data는 물론 methods에도 접근할 수 없는 상태입니다.

- created : 이벤트 및 데이터 설정이 완료되었습니다. 하지만 아직 템플릿이나 DOM이 마운트가 되어있지 않습니다. this.data는 제대로 가져오는 반면 this.$el 을 undefined로 반환해주고 있습니다.

- beforeMount : 마운트 바로 이전 시점이며 [render][link2]라는 메서드가 호출되는 시점입니다. 역시 this.$el 은 아직 접근 불가능합니다. 아마 beforeMount는 사용할 일이 많지 않을 것 입니다. (redenr 메서드는 추후에 다뤄보도록 하겠습니다.)

- mounted : 마운트가 완료된 시점이며, this.$el 에 접근이 가능해집니다. 보통 이 부분에서 ajax를 호출하여 데이터를 불러옵니다.

- beforeUpdate : changeText 메서드를 실행시켜 text data를 변경 후 실행됩니다. 데이터는 변경되어있는 상태이며 DOM 랜더링만 되지 않은 상태이기 떄문에 this.text가 `랜더링될 예정`인 반갑습니다! 를 반환해 줍니다.

- updated : beforeUpdate 후 DOM 랜더링 까지 완료 된 후 실행되는 시점입니다.

- beforeDestroy : 파기되기 직전의 상태입니다. 해당 인스턴스는 이 시점까지 완벽한(?) 동작을 수행합니다.

- destroyed : 모든 기능이 파기 된 후 호출됩니다. 모든 이벤트가 제거되어있으며 하위에 존재하는 인스턴스 모두 삭제 됩니다. `this._watcher.active`가 false를 반환하며 더이상 감시하지 않는다는 상태를 알려줍니다.

ps - 그림에는 없지만 Vue.js 2.2.0 부터 `<keep-alive>` 라는 기본 내장 컴포넌트에서 `activated`와 `deactivated`라는 라이프 사이클이 동작한다고 합니다만 이번 포스팅에서는 다루지 않겠습니다.
