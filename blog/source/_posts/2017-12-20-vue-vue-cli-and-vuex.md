---
title: Vue.js - Vue-cli를 이용한 vue 프로젝트 생성
tags:
  - javascript
  - vue
  - vue js
  - vue-cli
  - vue project
banner:
  url: >-
    https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png
categories:
  - Javascript
  - vue
published: true
date: 2017-12-20 17:25:13
---
이미지 출처(https://vuejs.org/images/logo.png)

## 프로젝트 생성

여태까지 Vue.js에 대한 아주아주 기본적인 문법들을 살펴보았습니다. 이제 Vue.js를 사용하여 프로젝트를 구성해보려고 합니다.
프로젝트를 구성해보기 앞서 `vue-cli`라는 것을 설치 하겠습니다.

vue-cli는 vue 프로젝트를 매우 간편하게 구성하도록 도와주는 보일러 플레이트 입니다. 리액트를 사용해보셨다면 create-react-app과 같은 기능을 도와준다고 생각하면 되겠습니다.

```bash
npm i -g vue-cli
```

vue-cli설치가 완료 되었다면 이제 vue프로젝트를 생성해봅시다.
실행문법은 다음과 같습니다.
```bash
vue init <template-name> <project-name>
```

템플릿 네임은 해당 프로젝트를 어떠한 환경으로 설정 할 것인지 정하는 것 이고, 프로젝트 네임은 해당 프로젝트의 이름을 입력합니다.
프로젝트 네임은 사용자가 원하는 이름으로 설정하면 되지만 템플릿 네임은 vue-cli에서 제공하는 몇가지 안을 보고 선택해야 합니다.

- webpack
- webpack-simple
- browserify
- browserify-simple
- pwa
- simple

위 와같은 템플릿을 제공하고 있으며 각 템플릿 별 자세한 설명은 [vue-cli 깃헙](https://github.com/vuejs/vue-cli)을 확인해보시길 바랍니다.

저희가 사용할 템플릿은 webpack-simple 입니다. 이름을 보면 유추할 수 있겠지만 webpack을 사용하는 프로젝트를 생성해줍니다.

```
vue init webpack-simple app
```

명령어를 입력하면 몇 가지 환경에 대한 질문을 합니다. 가벼운 연습 예제로 사용할 예정이니 전부 엔터로 넘어갑니다.
모든 질문이 끝나면 첫 번째 vue 프로젝트가 생성되었습니다.

![structure](https://user-images.githubusercontent.com/14171723/34198787-f6cbc400-e5ae-11e7-9d3a-0998b79b02c6.png)
위 vue-cli 버전은 2.9.2 입니다.


## 실행

자 이제 프로젝트도 만들었으니 실행을 시켜보아야겠지요?

```bash
cd app
npm i
```
방금 만든 app 프로젝트로 들어가서 package.json에 명시된 모듈들을 설치해줍시다.
설치가 완료되었다면

```bash
npm run dev
```
명령어를 실행하면 자동으로 웹 브라우저에 프로젝트가 실행될 것 입니다.
이제 Vue.js 프로젝트를 시작할 모든 준비가 완료되었습니다.
