import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import axiosJsonpAdapter from 'axios-jsonp'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // ローディング
        loading: false,
        // ペイン・ズームレベル・緯度・経度
        id: 3,
        zoom: 14,
        lat: 35.6795,
        lng: 139.7672,
        // レイヤ順情報
        mapTypeList: [],
        // ペイン配置情報管理
        mapTypeJson: null,
        // 初期URL
        rootUrl: '/3/14/35.6795/139.7672/tPale/osm/tOrt',
        // 現在のレイヤ順情報URL
        nowMapTypeUrl: '',
        // 画面遷移後のレイヤ順情報URL
        nextMapTypeUrl: '',
        // MapFanAPIキー
        mapFanApiKey: ''
    },
    mutations: {
        // ローダー状態格納
        setLoading(state, payload) {
            state.loading = payload;
        },
        // 初期ペイン配置情報格納
        setDefaultMapTypeJson(state, paneTypeJson) {
            state.mapTypeJson = paneTypeJson;
        },
        // ペイン・ズーム・緯度・経度・レイヤ順情報を格納
        setLocationInfo(state, val) {
            state.id = val.id;
            state.lat = val.lat;
            state.lng = val.lng;
            state.zoom = val.zoom;
            state.mapTypeList = val.mapTypeList;
        },
        // レイヤ順情報格納
        setMapTypeList(state, mapTypeList) {
            state.mapTypeList[mapTypeList.index] = mapTypeList.selected;
        },
        // 現在のレイヤ順情報URL格納
        setNowMapTypeUrl(state, nowMapTypeUrl) {
            state.nowMapTypeUrl = nowMapTypeUrl;
        },
        // 画面遷移後のレイヤ順情報URL格納
        setNextMapTypeUrl(state, nextMapTypeUrl) {
            state.nextMapTypeUrl = nextMapTypeUrl;
        },
        // レイヤ切り替え後のレイヤ順情報URL格納
        setSelectMapTypeUrl(state, selectMapTypeUrl) {
            state.selectMapTypeUrl = selectMapTypeUrl;
        },
        // ペイン配置情報更新
        setMapTypeJson(state, select) {
            for (const v of state.mapTypeJson) {
                try{
                    v.data[0].mapList[select.index].mapType = select.selected;
                } catch(e) {
                    continue;
                }
            }
        },
        // URL貼り付け時ペイン配置情報更新
        pastingMapTypeJson(state, mapTypeList) {
            for (let index = 0; index < mapTypeList.length; index++) {
                for (const v of state.mapTypeJson) {
                    try{
                        v.data[0].mapList[index].mapType = mapTypeList[index];
                    } catch(e) {
                        continue;
                    }
                }
            }
        },
        // MapFanAPIキー格納
        getMapFanApiKey(state, mapFanApiKey) {
            state.mapFanApiKey = mapFanApiKey;
        }
    },
    actions: {
        // 各情報をstateに格納
        getInfo(context, info) {
            // 現在のレイヤ順情報URL作成
            let nowMapTypeUrl = info.mapTypeList.join('/');
            // URLを動的に変更
            let url = '/' + [info.id, info.zoom, info.lat , info.lng, nowMapTypeUrl].join('/');
            history.replaceState('', '', url);
            // ペイン・ズーム・緯度・経度格納
            context.commit('setLocationInfo', info);
            // 現在のレイヤ順情報URL格納
            context.commit('setNowMapTypeUrl', nowMapTypeUrl);
        },
        // 画面遷移後のレイヤ順情報URLをstateに格納
        getNextMapTypeUrl(context, id) {
            // 画面遷移後のレイヤ順情報取得
            let nextMapList = [];
            for (const v of this.state.mapTypeJson) {
                if (v.id === Number(id)) {
                    for (let i = 0; i < this.state.mapTypeList.length; i++) {
                        try{
                            nextMapList.push(v.data[0].mapList[i].mapType);
                        } catch(e) {
                            continue;
                        }
                    }
                }
            }
            // 画面遷移後のレイヤ順情報URL生成
            let nextMapTypeUrl;
            if (nextMapList.length === 1) {
                nextMapTypeUrl = nextMapList[0];
            } else {
                nextMapTypeUrl = nextMapList.join('/');
            }
            // 画面遷移後のレイヤ順情報URLを格納
            context.commit('setNextMapTypeUrl', nextMapTypeUrl);
        },
        // MapFan認証キー取得
        async getMapFanApiKeyAction(context, mapFanAuthKey) {
            const mapFanAuthUrl = 'https://api-auth-pre.mapfan.com/v1/auth?appid=' + mapFanAuthKey + '&date=20171101102029';
            let mapFanApiKey;
            await axios.get(mapFanAuthUrl, {
                adapter: axiosJsonpAdapter
            })
                .then((res) => {
                    mapFanApiKey = res.data.key;
                });
            // MapFanAPIキー格納
            context.commit('getMapFanApiKey', mapFanApiKey);
        }
    }
})
