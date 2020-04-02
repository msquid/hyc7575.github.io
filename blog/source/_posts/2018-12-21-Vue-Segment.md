---
title: Vue.js - iOS Segment 만들기
date: 2018-12-21 19:14:44
tags:
	- javascript
	- vue
	- vue js
	- UI
banner:
	url: >-
		https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png

categories:
	- Javascript
	- vue
published: true
---
이미지 출처(https://vuejs.org/images/logo.png)

실무에서 웹뷰 작업을 하면서 iOS의 Segment UI를 자주 사용하여서 Vue로 된 컴포넌트 파일 하나를 만들어 두려고 한다.

## 구현
```html
<!-- Segment.vue -->
<template>
	<div style="overflow: hidden;">
		<ul class="segment" :style="getUlStyle()">
			<li v-for="item in items" :key="item.id"
				:style="getLiStyle(item)"
				:class="{'on': item.isOn}"
				@click="selectItem(item)"
			>
				{{item.title}}
			</li>
		</ul>
	</div>
</template>
　
<script>
	export default {
		props: ['items', 'onColor', 'onTextColor', 'textColor', 'align', 'width'],
		methods: {
			getUlStyle() {
				const UlStyle = {};
				const customStyle = {};
　
				if( this.width ) customStyle.width = this.width;
				switch(this.align) {
					case 'left':
					customStyle.margin = '0';
					break;
					case 'right':
					customStyle.margin = '0';
					customStyle.float = 'right';
					break;
					default:
				}
				if( this.onColor ) customStyle.borderColor = this.onColor;
　
				return Object.assign({}, UlStyle, customStyle);
			},
			getLiStyle(item) {
				const liStyle = {
					width: 100 / this.items.length + '%',
					color: item.isOn ? '#fff' : 'rgb(0, 122, 255)'
				};
				const customStyle = {};
　
				if( this.onColor ) customStyle.borderColor = this.onColor;
				if( this.textColor && !item.isOn ) customStyle.color = this.textColor;
　
				if( item.isOn ) {
					if( this.onTextColor ) liStyle.color = this.onTextColor;
					if( this.onColor ) liStyle.backgroundColor = this.onColor;
				}
				　
				return Object.assign({}, liStyle, customStyle);
			},
			selectItem(item) {
				if( item.isOn ) return;
　
				this.items.forEach(v => {
					v.isOn = false;
				});
				item.isOn = true;
　
				if( typeof item.callback === 'function' ) {
					item.callback(item);
				}
			}
		}
	}
</script>
　
<style lang="scss" scoped>
	.segment {
		margin: 0 auto;
		width: 100%;
		overflow: hidden;
		border: 1px solid rgb(0, 122, 255);
		border-radius: 4px;
		box-sizing: border-box;
		li {
			float: left;
			height: 35px;
			line-height: 35px;
			font-size: 15px;
			color: rgb(0, 122, 255);
			border-left: 1px solid rgb(0, 122, 255);
			text-align: center;
			background-color: #fff;
			box-sizing: border-box;
			cursor: pointer;
			&.on {
				color: #fff;
				background-color: rgb(0, 122, 255);
			}
			&:first-child {
				border-left: none;
			}
		}
	}
</style>
```


## 사용법
```html
<template>
	<div>
		<Segment :items="testItems"/>
		<br/>
		<Segment :items="testItems" width="300px" align="left"/>
		<br/>
		<Segment :items="testItems" width="300px"/>
		<br/>
		<Segment :items="testItems" width="300px" align="right"/>
		<br/>
		<Segment :items="testItems" width="75%" onColor="#ff7359" textColor="#ff7359"/>
	</div>
</template>
<script>
	import Segment from './Segment';
	export default {
		components: {
			Segment
		},
		data() {
			return {
				testItems: [
					{
						id: 1,
						title: '첫번째',
						isOn: true
					},
					{
						id: 2,
						title: '두번째',
						isOn: false,
						callback: (item) => {
							// item: get current object
						}
					},
					{
						id: 3,
						title: '세번째',
						isOn: false
					}
				]
			}
		}
	}
</script>
```

## 결과
![결과 이미지](https://user-images.githubusercontent.com/14171723/50338270-29050800-0557-11e9-9255-f80f6355badf.png)