---
title: Javascript(잡담) - new Array(n)의 undefined
date: 2017-05-31 16:33:44
banner:
    url: https://cloud.githubusercontent.com/assets/14171723/26621663/7479b128-4622-11e7-9a27-96aa8bb863a6.png
categories:
    - Javascript
    - 잡담
tags:
    - nodejs
    - javascript
    - javascript
    - javascript array

published: true
---
작업중인 라이브러리의 메서드 중 인자로 들어오는 array들의 중복값을 리턴해주는 것이 있습니다. 이를 튜닝하면서 생긴 뻘짓을 쓰는 글 입니다. 성능 테스트를 하기 위해서 `new Array(10000000);` 형태로 배열을 만들어서 테스트 하였습니다.

```javascript
var a = new Array(1000000000);
var b = new Array(1000000000);
var c = new Array(100000000);
var d = new Array(10000000);
method(a,b,c,d); // [];
```
성능 자체는 만족스럽게 올라갔지만 예상했던 `[undefined]`가 출력되지 않음.. Array 생성자에 인자로 정수를 넣어주면 해당 길이만큼의 undefined를 가진 배열을 반환해주는 것으로 알고 있던 나는 indexOf 메서드를 사용해보았습니다.

```javascript
var a = new Array(10);
a.indexOf(undefined); // -1
```
이상하다 생각되어서 되지도 않는 영어를 조합하며 구글링을 시작했지만 원하는 글은 찾아볼 수 없었고 심지어 indexOf를 사용하여 undefined를 검색하던 어떤 예제는 index값을 잘 반환하는 상황... 그 예제와 배열 생성하는 방법을 비교해보니
```javascript
var arr1 = ['test', undefined, undefined]; // 해당 예제
var arr2 = new Array(10);
arr1.indexOf(undefined); // 1
arr2.indexOf(undefined); // -1
```
이 사실을 통해 예측할 수 있는 사실은 `new Array(n)`은 값이 할당되지 않고 length 속성만 지정해주지 않을까 라는 점이다. 콘솔에서 배열 내부를 열어보았다.
![console array](https://cloud.githubusercontent.com/assets/14171723/26661897/6ec79062-46bb-11e7-8552-89dfed6067ac.png)

예상했던대로 값이 없고 length만 지정된 배열이 들어오게 되었습니다.( 저 undefined x 10 이라는 것 때문에 여태 undefined가 할당된줄 알았습니다 ㅠ ) 저 `a`라는 배열에 요소를 추가해보겠습니다.
![add element](https://cloud.githubusercontent.com/assets/14171723/26662468/fcaaffc4-46be-11e7-93d7-112745424bbc.png)
0~9까지의 값이 **할당되지 않았고** 10번 인덱스부터 값이 할당 되었네요. javascript의 배열이 실상은 Array.prototype 을 상속받은 `객체`여서 그런게 아닐까 생각되네요.(근거 있는 답이 아니라 제 추측입니다.) 본론으로 돌아와서 값이 할당되지 않은 배열을 반환하기에 이 `a`라는 배열은 map이나 filter와 같은 메서드들은 제대로 동작을 하지 않게 될 것입니다.

```javascript
var a = new Array(10);
a.map(function(v, i) {
	console.log(v, i);
	return 0;
});
```
10번의 콘솔과 0이 10개가 담긴 배열을 반환해줘야할 것 처럼 보이지만 값이 할당되지 않은 배열이므로 예상했던 동작은 하지 않습니다.
```javascript
var a = new Array(10);
a.push('ha');
a.map(function(v, i) {
	console.log(v, i);
	return 0;
});
// ha 10
// [ 빈값 10개 , 0]
```
이렇게 값을 명시적으로 할당해주어야 ha라는 값과 10 이라는 인덱스를 보여주고, 10번 인덱스에 0이라는 값 가진 배열을 출력해주네요. **결론은 할당 되지 않았기 떄문에 성능테스트를 할 때 비어있는 배열을 반환해준 것 이였습니다!** 의식의 흐름에 맡겨 막 쓴 글이여서 두서없고 막 삼천포로 빠지고 그랬던거 같아요...




　
　
ps - 불여우 콘솔에서는...
![firefox console](https://cloud.githubusercontent.com/assets/14171723/26663318/e5f313a6-46c4-11e7-95a9-02d1fbd5fb09.png)

이럴수가 ㅠ
