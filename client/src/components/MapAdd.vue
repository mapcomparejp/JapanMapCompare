<!--地図画面コンポーネント-->
<template>
    <div class='mapAdd'>
        <!--セレクトメニュー-->
        <b-form-select
            v-model='selected'
            v-bind:options='options'
            @change='onChange(mapIdName, $event)'
            class='mt-3 mb-2 shadow-sm'
        ></b-form-select>
        <!--地図画面生成-->
        <div
            v-bind:id='mapIdName'
            v-bind:class="mapClass"
            v-bind:style="mapStyle"
            class='map-size shadow-sm'>
        </div>
    </div>
</template>

<script>
    // Leaflet読み込み
    import L from 'leaflet'
    // 地図種類読み込み
    import mapJson from '../assets/MapType.json'

    export default {
        name: 'MapAdd',
        props: {
            index: Number,
            mapId: String,
            mapType: String,
            heightVh: String
        },
        data() {
            return {
                mapIdName: '',
                mapClass: 'map-size',
                mapStyle: {
                    height: this.heightVh
                },
                selected: this.mapType,
                options: mapJson,
                mapIdObj: {},
                tileAdd: {},
                lat: this.$store.state.lat,
                lng: this.$store.state.lng,
                zoom: this.$store.state.zoom
            }
        },
        created: function () {
            // マップ名取得
            this.mapIdName = this.mapId;
        },
        mounted: function () {
            // タイルオブジェクト生成処理
            this.tileCreate();
            // マップオブジェクト生成処理
            this.mapCreate(this.lat, this.lng, this.zoom);
        },
        methods: {
            // タイルオブジェクト生成処理
            tileCreate: function() {
                // タイル全て読み込み
                for (const v of mapJson) {
                    if (v.value === 'gRoad') {
                        // GoogleMapsタイル
                        this.tileAdd[v.value + '_' + this.mapIdName] = new L.gridLayer.googleMutant({
                            type:  v.type
                        });
                    }else if (v.value === 'bRoad') {
                        // BingMapタイル
                        this.tileAdd[v.value + '_' + this.mapIdName] = new L.tileLayer.bing({
                            bingMapsKey: v.bingMapsKey,
                            imagerySet: v.imagerySet,
                            culture: v.culture
                        });
                    }else if (v.value === 'mapfan') {
                        // MapFanタイル
                        const mapFanMapUrl = v.tileURL[0] + this.$store.state.mapFanApiKey + v.tileURL[1];
                        this.tileAdd[v.value + '_' + this.mapIdName] = new L.tileLayer(mapFanMapUrl, {
                            attribution: v.attribution
                        });
                    }else {
                        // 一般タイル
                        this.tileAdd[v.value + '_' + this.mapIdName] = new L.tileLayer(v.tileURL, {
                            attribution: v.attribution
                        });
                    }
                }
            },
            // マップオブジェクト生成処理
            mapCreate: function(lat, lng, zoom) {
                // Viewごとの各タイル表示
                for (const v of Object.keys(this.tileAdd)) {
                    if (this.mapType + '_' + this.mapIdName === v) {
                        // 地図読み込み
                        this.mapIdObj[this.mapIdName] = L.map(this.mapIdName, {
                            center: [lat, lng],
                            zoom: zoom,
                            zoomControl: true,
                            maxZoom: 18,
                            layers: [this.tileAdd[v]]
                        });
                        // 親コンポーネントにマップオブジェクト送信
                        this.$emit('child-event', this.mapIdObj[this.mapIdName]);
                    }
                }
            },
            // セレクトボックス切り替え処理
            onChange: function(mapObj, value) {
                // 各レイヤ切り替え
                for (const v of Object.keys(this.tileAdd)) {
                    // 不要レイヤ削除
                    this.mapIdObj[mapObj].removeLayer(this.tileAdd[v]);
                    if (value + '_' + mapObj === v) {
                        // 選択レイヤ追加
                        this.mapIdObj[mapObj].addLayer(this.tileAdd[v]);
                    }
                }
                // レイヤ順情報格納納
                this.$store.commit('setMapTypeList', {
                    index: this.index,
                    selected: this.selected
                });
                // ペイン配置情報更新
                this.$store.commit('setMapTypeJson', {
                    index: this.index,
                    selected: this.selected
                });
            }
        }
    }
</script>

<style scoped>
    /*地図画面サイズ*/
    .map-size {
        /*表示順*/
        z-index: 0;
        /*GoogleMapsズレ対応*/
        text-align: left;
        /*枠*/
        border: solid 1px #C8C8C8;
    }
</style>
