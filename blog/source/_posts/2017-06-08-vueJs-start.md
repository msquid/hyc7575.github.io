---
title: Vue.js - 시작하기
date: 2017-06-08 21:29:57
banner:
    url: https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/480px-Vue.js_Logo.svg.png?uselang=ko
categories:
    - Javascript
    - vue
tags:
    - javascript
    - vue
    - vue js
---

[link-other-framework]: https://kr.vuejs.org/v2/guide/comparison.html
[vue-kr]: https://kr.vuejs.org/

## 시작하기 앞서
지난 주말 여기 저기서 들려오고 있으며 엄청난 성장세를 보여주고 있는 Vue.js의 공식 문서를 한번 읽어 보았습니다. 한글화가 굉장히 잘 되어있어서 금방금방 슝슝 스크롤을 내리면서 읽을 수 있더군요.(커뮤니티분들께 감사) 처음 문법을 보면서 느낀점은 마치 angular1 과 react를 합친 듯 한 기분이 들었습니다. 또 '러닝커브가 낮고 굉장히 효율적이다.' 라는 소리가 괜히 나오는게 아닌것 같았습니다. 문서를 한번 읽어보니 어떤 흐름으로 흘러가는지 대충 파악이 가능했습니다. 사용 방법도 매우 간단하여 jquery처럼 문서에 스크립트 한줄 추가(이 방법이 best practice 라는건 아닙니다!)하거나 vue-cli와 같은 제너레이터를 이용하여 쉽게 webpack 혹은 browserify와 함께 사용할 수 있습니다. 진행하는 프로젝트 중 spring 위에서 프레임워크 없이 jquery를 기반으로 사용하는 것이 있는데 Vue.js라면 쉽게 특정 부분에서 사용할 수 있겠다 싶어서 바로 적용해 보았습니다. 결과부터 말하자면 아직 진행중이지만 꽤 괜찮은 것(기존 코드가 너무...) 같더군요. 물론 아직 지식이 부족해서 많은 삽질이 있었지만 나름 만족스럽게 진행되어 가고 있는 듯 합니다. 이 작업을 계기로 장기적으로 프로젝트에 조금씩 도입해가며 기초부터 한번 포스팅을 해보고자 해서 쓰게 되었습니다.

## 소개
Vue.js는 이름에서 예상할 수 있듯 view작업에 초점을 맞춘 프레임워크입니다. 그래서인지 React와 많은 공통점을 가지고 있으며, 디렉티브(지시자)라는 문법이 등장하는데 이는 angular1에서 영감을 받아 상당 부분 개선되었다고 합니다. [이곳][link-other-framework]에서 다른 프레임워크와 Vue.js가 어떻게 다른지 어떠한 부분이 효율적인지에 대해서 자세히 설명되어 있으니 관심이 있으신 분들은 한번 읽어보시길 바랍니다.

## 호환
공식적으로 es5를 지원하는 브라우저에서 사용가능하다고 합니다. es6 문법을 사용한다면 babel 컴파일을 거쳐야합니다.

## 설치
- npm

```
npm i vue
```
- cdn

```html
<script src="https://unpkg.com/vue"></script>
```
프로젝트에 위 스크립트 한줄을 추가 함으로써 Vue.js를 사용할 수 있습니다.
ps - `create-react-app`과 같은 `vue-cli`라는 어플리케이션을 구성해주는 도구도 있습니다. 위에서 언급 하였듯, webpack or browserify의 설정까지 해주어서 편리합니다.

## 간단한 어플리케이션
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Test</title>
    </head>
    <body>
        <div id="app">
            {{text}}
        </div>
        <script src="https://unpkg.com/vue"></script>
        <script type="text/javascript">
            var app = new Vue({
                el: '#app',
                data: {
                    text: 'test 입니다.'
                }
            });
            // 콘솔에서 한번...
            // app.text = '바뀌어라!!';
        </script>
    </body>
</html>
```

### Result

<p data-height="300" data-theme-id="11131" data-slug-hash="OgMRyZ" data-default-tab="js,result" data-user="small" data-embed-version="2" data-pen-title="OgMRyZ" class="codepen">See the Pen <a href="https://codepen.io/small/pen/OgMRyZ/">OgMRyZ</a> by keun hyeok (<a href="https://codepen.io/small">@small</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Vue.js는 MVVM 패턴에 영감을 받았다고 합니다. 위 예제에서의 `Vue 생성자`는 MVVM(Model-View-ViewModel)중 VM(ViewModel)을 생성합니다. 인자로 들어가는 객체를 통하여 여러 옵션을 지정해 줄 수 있습니다. 이 부분에 대해서는 차차 알아가 보도록 하겠습니다.


## 맺음
아직 저도 공부를 하는 입장인지라(만만히 보고 도입했다가 삽질 또 삽질...) 공식 문서를 기반으로 한 예제 및 느낀 점을 기록하는 용도로서의 포스팅이 될 것 같습니다.

## 참고
[Vue.js 한글 문서][vue-kr]
