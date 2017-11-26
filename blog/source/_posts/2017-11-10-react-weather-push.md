---
title: html5 geolocation api 를 이용한 현 위치 날씨 알아보기
date: 2017-11-10 14:11:28
banner:
    url: https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg
tags:
    - React
    - google map api
    - weather api
    - html5 geolocation
    - geolocation
categories:
    - Javascript
    - React
published: true
---
[link1]: https://github.com/hyc7575/weatherPush

html5의 스펙인 Geolocation을 이용하여 현재 위치의 날씨를 알려주는 기능을 만들어 볼까 합니다.
service worker와 firebase에서 제공하는 fcm 을 이용하여 웹앱 형태로 추 후 만들어 볼 예정이기도 합니다.

React를 이용한 무언가를 만들어 보아야지 하고 결심하고 시작한 작업이지만 만들다 보니 React의 중요성이 크지 않게 되었네요.

## 설치
```bash
npm i -g create-react-app
create-react-app weatherPush
```

create-react-app 도구를 사용하여 react 프로젝트를 생성합니다.

## 폴더 구조

![complte-folder-structure](https://user-images.githubusercontent.com/14171723/32644952-23aef72c-c628-11e7-9684-0cf1d31fb8b5.png)
작업이 끝나면 이러한 형태의 구조를 가지게 됩니다. ( firebase와 ServiceWorker 관련 파일은 무시해주세요. 아직 진행 중.. )


## 링크
[깃허브 링크][link1]

## 핵심 코드
핵심인 App.js 정도만 살펴보려 합니다.

App.js

```javascript
import React, {Component} from 'react';
import './App.css';
import MyMap from '../components/map';
import WeatherInfo from '../components/weatherInfo';
import mapApi from '../config/googleMap';
import weatherConfig from '../config/weather'
import axios from 'axios';
import Promise from 'bluebird';
　
class App extends Component {
    constructor(props) {
        super(props);
        　
        this.state = {
            position: [],
            city: '',
            countryCode: '',
            weatherList: [],
            formatted_address: '',
            weatherDate: 0
        }
    }
    componentWillMount() {
        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((p) => {
                // 아래 api 위도 경도가 조금 정확하지 않아서 html5 스펙인 geolocation 사용
                this.setState({
                    position: [p.coords.latitude, p.coords.longitude]
                }, () => {
                    resolve(p.coords)
                })
            });
        }).then((coords) => {
            return new Promise((resolve, reject) => {
                axios.get('https://freegeoip.net/json/').then((res) => {
                    const data = res.data;
                    this.setState({
                        city: (data.city || data.region_name),
                        countryCode: data.country_code
                    }, () => {
                        resolve({
                            city: (data.city || data.region_name),
                            countryCode: data.country_code,
                            coords: coords
                        })
                    });
                }).catch((err) => {
                    console.error(err);
                });
            })
        }).then((data) => {
            return new Promise((resolve, reject) => {
                axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${weatherConfig.key}&q=${data.city.toLowerCase()},${data.countryCode.toUpperCase()}`).then((res) => {
                    this.setState({
                        weatherList: res.data.list
                    }, () => {
                        resolve(data.coords)
                    });
                });
            })
        }).then((coords) => {
            const geocoder = new window.google.maps.Geocoder;
            const latlng = {
                lat: coords.latitude,
                lng: coords.longitude
            };
            geocoder.geocode({
                'location': latlng
            }, (results, status) => {
                this.setState({
                    formatted_address: results[results.length - 1].formatted_address
                })
            });
        });
    }
    　
    render() {
        const {position, weatherList, formatted_address} = this.state;
        return (
            <div className="app">
                <h1 className="app-title">날씨 알림 서비스</h1>
                <div className="map-wrap">
                    <MyMap apiKey={mapApi.apiKey} center={position} zoom={16}></MyMap>
                </div>
                <section className="info-area">
                    <p>
                        {formatted_address
                            ? `당신은 ${formatted_address}에 위치하시군요.`
                            : '위치를 탐색중입니다...'}
                    </p>
                    <ul className="weather-info-wrap">
                        {weatherList.map((v, i) => {
                            const now = new Date();
                            const date = new Date(v.dt_txt).getDate();
                            if (now.getDate() + this.state.weatherDate >= date) {
                                const hour = v.dt_txt.split(' ')[1].substr(0, 2);
                                return (<WeatherInfo data={v} key={i} hour={hour} date={date}/>)
                            }
                        })}
                    </ul>
                </section>
                <button className="btn" onClick={() => {
                    this.setState({
                        weatherDate: this.state.weatherDate + 1
                    });
                }}>더 보기</button>
            </div>
        );
    }
}
　
export default App;
```

각 api요청을 위한 axios, 순차적인 비동기 작업이 필요하여 bluebird(Promise)를 사용하였습니다.
각 api요청 및 상태 작업을 살펴보도록 하겠습니다.

　



```javascript
navigator.geolocation.getCurrentPosition((p) => {
    // 좌표 값 get
});
```
html5 스펙에서 추가된 geolocation 입니다. 현재 위치의 위도 경도 값을 구할 수 있습니다. 이제 이 좌표를 이용하여서 google map에서 현 위치를 표시 해 줄 것 입니다.

　
```javascript
axios.get('https://freegeoip.net/json/').then((res) => {
    // get 좌표 or 지역 name
}).catch((err) => {
    console.error(err);
});
```
ip, 좌표, 지역 등의 값을 제공해줍니다. geolocation에 비해 좌표가 정확하지 않아 날씨 api에서 필요한 지역 정보만 사용하였습니다.

　
```javascript
axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${weatherConfig.key}&q=${data.city.toLowerCase()},${data.countryCode.toUpperCase()}`).then((res) => {
    // 날씨 정보 get
});
```
지역정보를 통하여 해당 지역의 날씨에 대한 정보를 가져옵니다. 위의 freegeoip와 지역 네이밍 규칙이 비슷하더군요.
이 데이터를 가공하여 사용자에게 정보를 보여줍니다.

　
```javascript
const geocoder = new window.google.maps.Geocoder;
const latlng = {
    lat: coords.latitude,
    lng: coords.longitude
};
geocoder.geocode({
    'location': latlng
}, (results, status) => {
    this.setState({
        formatted_address: results[results.length - 1].formatted_address
    })
});
```
google의 geoCoder 를 이용하여 상세한 지역 정보를 가져옵니다. (우편번호, 구, 군 등..)
위의 freegeoip를 사용하지 않고 이 정보를 잘 가공만 한다면 문제없이 사용 가능하지 않을까 합니다. ( 코드 분량과 수고가 좀 필요할 것 같아서 분리 하였습니다. )


## 화면
![view](https://user-images.githubusercontent.com/14171723/32645792-64e8ce4e-c62c-11e7-87ec-b9c1a58483df.png)

더보기를 누르면 state.weatherDate 값이 증가하며 그 다음날의 날씨를 불러올 수 있습니다. 해외에서 제공하는 api때문인지 날씨가 묘하게 다른감이 없지 않아 있더군요. 개인 연습용으로 작업하는 것이라 무시하고 진행하였습니다.

## apis
날씨 : [링크][https://openweathermap.org/current]
지역(freegeoip) : [링크][https://freegeoip.net/]
지도 : [api 링크][https://developers.google.com/maps/?hl=ko], [외부 컴포넌트 링크][https://github.com/istarkov/google-map-react]

## 마치며
firebase에서 제공하는 메세징 서비스(fcm)와 service worker를 추가하여 웹앱 형태로 동작하도록 추가적인 작업을 진행 해보려합니다.
제 검색능력이 부족한지 자료를 구하기가 많이 힘드네요. 현재 많은 삽질을 겪고 있습니다. 가끔 시간을 내어서 완성시켜 봐야겠습니다.
