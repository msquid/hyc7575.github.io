---
title: img태그 retina사이즈 대응
date: 2018-09-10 15:02:41
tags:
    - html
    - css
    - input radio
    - custom radio
banner:
    url: >-
        /images/htmlcssposter.png
categories:
    - html/css
published: true
---

[link1]: https://caniuse.com/#search=srcset

## 이슈
img태그 사용시 특정 retina 디스플레이에서 2배수, 3배수 이미지가 적용되지 않았음.

## 해결
기존 retina 디스플레이의 이미지 대응을 위해서 img태그의 `srcset`이라는 어트리뷰트를 아래와 같이 사용하고 있었다.

```html
<img src="testSrc.png"
     srcset="testSrc.png 1x, testSrc@2x.png 2x, testSrc@3x.png 3x"
     alt="테스트 이미지">
```

하지만 특정 디스플레이에서 제대로 적용되지 않음을 발견하였고, 그 이유가 srcset속성은 IE, Android 5.0 미만의 버전에서 지원하지 않는다고 한다. ([링크][link1])
리서칭 결과 3가지 정도의 방안을 찾았다.

- 1. javascript를 이용하여 retina 디스플레이를 체크하고 해당 배수의 이미지로 교체
- 2. svg 사용
- 3. default 이미지를 2배 or 3배수 사용 후 원본 사이즈로 고정

세가지 다 작은 단점들이 조금씩 존재하였지만 결론부터 말하면 3번 방향으로 해결하였다.

1번의 경우 이미지 하나를 표현하기 위해 여러개의 요청을 발생시키게 되는 문제가 생길 수 있고, 2번은 IE8 미지원 및 이미지화(?)되어 버린 리소스들은 다시 작업이 필요하였고 3번은 retina가 아닌 디스플레이에서는 더 큰 용량의 이미지를 사용하여야 했다.

고민해본 결과, 매우 큰 이미지는 잘 사용하지 않는 편이여서 2배수 or 3배수 이미지를 default로 사용하기로 하였다.

```html
<img src="testSrc@2x.png"
     width="400" height="250"
     srcset="testSrc.png 1x, testSrc@2x.png 2x, testSrc@3x.png 3x"
     alt="테스트 이미지">
```

추후 리소스 정리를 진행한다면, 모바일 기반 제품들은 svg로 갈아타면 좋을듯하다.
