<template>
    <div class='pane'>
        <!--メニュー-->
        <Menu></Menu>

        <b-container fluid>
            <b-row>
                <div v-for='(item, index) in mapList' :key='item.mapId' v-bind:class='gridClass'>
                    <!--地図画面-->
                    <MapAdd
                        v-bind:index='index'
                        v-bind:map-id='item.mapId'
                        v-bind:map-type='item.mapType'
                        v-bind:height-vh='heightVal'
                        v-bind:style= '{height: heightVh}'
                        v-on:child-event='parentMethodView'
                    />
                </div>
            </b-row>
            <b-row class='m-1 float-right'>
                <!-- ズームレベル表示 -->
                <ZoomLevel></ZoomLevel>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Menu from '@/components/Menu.vue'
    import ZoomLevel from '@/components/ZoomLevel.vue'
    import MapAdd from '@/components/MapAdd.vue'
    // 画面種類読み込み
    import paneTypeJson from '../assets/PaneType.json'

    export default {
        name: 'Pane',
        components: {
            Menu,
            MapAdd,
            ZoomLevel
        },
        props: {
            id: Number,
            zoom: Number,
            lat: Number,
            lng: Number,
            layer: String
        },
        data() {
            return {
                heightVh: '',
                syncObj: {},
                syncObjSingle: {},
                heightVal: '',
                gridClass: '',
                mapList: {},
                flag: false,
                mapTypeList: []
            }
        },
        created: function () {
            // 画面生成時にJSONをVuexに保存
            this.$store.commit('setDefaultMapTypeJson', paneTypeJson);
            // URL貼り付けをリスト化
            this.mapTypeList = this.layer.split('/');
            // URL貼り付け時ペイン配置情報更新
            this.$store.commit('pastingMapTypeJson', this.mapTypeList);
            // 地図画面配置設定
            this.paneType(Number(this.id));
            // URLに入力された情報を初期値としてストアに格納
            if (this.id !== undefined) {
                this.$store.commit('setLocationInfo', {
                    id: this.id,
                    lat: this.lat.toFixed(4),
                    lng: this.lng.toFixed(4),
                    zoom: this.zoom,
                    mapTypeList: this.mapTypeList
                });
            }
        },
        mounted: function () {
            // 地図画面同期設定
            this.syncAdd();
            // 地図移動イベント設定
            this.syncObjSingle.on('moveend', this.infoChange);
        },
        beforeRouteUpdate (to, from, next) {
            // オブジェクトを空にする
            this.syncObj = {};
            this.syncObjSingle = {};
            // 地図画面配置設定
            this.paneType(Number(to.params.id));
            // ページ遷移
            next();
        },
        updated: function () {
            // 地図画面同期設定
            this.syncAdd();
            this.infoChange();
            // 地図移動イベント設定
            this.syncObjSingle.on('moveend', this.infoChange);
        },
        methods: {
            // 対象ペイン属性取得
            paneType: function(id) {
                // ペイン配置情報取得
                for (const v of this.$store.state.mapTypeJson) {
                    if (v.id === Number(id)) {
                        this.heightVal = v.data[0].heightVal;
                        this.gridClass = v.data[0].gridClass;
                        this.mapList = v.data[0].mapList;
                        // 画面遷移後のレイヤ順情報再取得
                        let nextMapList = [];
                        for (let i in this.mapList) {
                            nextMapList.push(this.mapList[i].mapType);
                        }
                        this.mapTypeList = nextMapList;
                    }
                }
            },
            // マップオブジェクト格納
            parentMethodView: function(fromChildVal){
                // 各マップオブジェクト格納
                this.syncObj[fromChildVal._container.id] = fromChildVal;
                // 単一マップオブジェクト格納
                this.syncObjSingle = fromChildVal;
            },
            // 地図画面同期設定
            syncAdd: function(){
                // 同期オプション
                let option = {
                    syncCursor: true,
                    syncCursorMarkerOptions: {
                        radius: 7,
                        fillOpacity: 0.3,
                        color: '#1253A4',
                        fillColor: '#F5F5F5'
                    }
                };
                // 地図画面同期設定
                for (const v of Object.keys(this.syncObj)) {
                    for (const vv of Object.keys(this.syncObj)) {
                        if (v !== vv) {
                            this.syncObj[v].sync(this.syncObj[vv], option);
                        }
                    }
                }
            },
            // 各情報を格納
            infoChange: function() {
                // 地図移動後の各情報をVuexに格納
                this.$store.dispatch('getInfo',{
                    id: this.id,
                    lat: this.syncObjSingle.getCenter().lat.toFixed(4),
                    lng: this.syncObjSingle.getCenter().lng.toFixed(4),
                    zoom: this.syncObjSingle.getZoom(),
                    mapTypeList: this.mapTypeList
                });
            }
        }
    }
</script>

<style scoped> 

</style>
