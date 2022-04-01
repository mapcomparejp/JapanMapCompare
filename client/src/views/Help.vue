<template>
    <div class="help">
        <!--メニュー-->
        <Menu></Menu>

        <b-container>
            <b-row>
                <b-col cols="11" offset="1" class="mb-5 mt-5">
                    <h5 class="mb-3">Japan Map Compare: mapcompare.jp</h5>
                    <p>
                        mapcompare.jpはOpenStreetMap, MapTiler, MapBox, Bing, Google, Apple, ESRI, Mapfan, 
                        地理院地図などの日本国内を対象としたウェブ地図を比較可能なページです。
                        GeofabrikとBBBikeが開発してきた Map Compare（
                        <b-link href="https://tools.geofabrik.de/mc" target="_blank">Geofabrik版</b-link>
                        ・<b-link href="https://mc.bbbike.org/mc/" target="_blank">BBBike版</b-link>）のアイデアをベースに、
                        Leaflet, Vue.jsなどの新しいウェブ地図技術を用いて構築したものです。
                    </p>
                    <p>
                        表示しているページのパーマリンクは下記の例のように作成できます
                    </p>
                    <p>
                        https://mapcompare.jp/3{number of panels}/14{zoom
                        level}/35.6795{lat}/139.7672{lon}/tPale{webmap_1}/osm{webmap_2}/tOrt{webmap_3}
                    </p>
                    <p>
                        MapBox, Bing Maps, Google Maps, Apple Maps, Mapfanは、相互に閲覧比較するためのみ用いることができます。
                        OpenStreetMapのデータ編集のために、これらのウェブ地図のデータを絶対に用いないでください。
                    </p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-4">比較可能なウェブ地図一覧 {webmap}:</h5>
                    <b-table :items="items"></b-table>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">このページは下記の研究プロジェクトによって開発されています:</h5>
                    <p>
                        <b-link
                        href="https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-18KT0049"
                        target="_blank"
                    >
                            2018-2021年度科学研究費基盤研究 (B) (特設分野) : クラウドソース型地理情報のトラスト
                        </b-link>
                    </p>
                    <b-link
                        href="https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-18KT0049"
                        target="_blank"
                    >
                        <b-img src="../assets/trusts_of_gi.png"></b-img>
                    </b-link>
                    <p>
                        <b-link
                        href="https://speakerdeck.com/tosseto/20190921sotm2019-lt-mc"
                        target="_blank"
                    >
                            ・State of the Map 2019 Lightning Talk
                        </b-link>
                    </p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">メールアドレス:</h5>
                    <p>mapcomparejp[at]gmail.com</p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">開発:</h5>
                    <p>MIERUNE Inc.</p>
                    <b-link href="https://mierune.co.jp" target="_blank">
                        <b-img src="../assets/mierune.png"></b-img>
                    </b-link>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">ライセンス:</h5>
                    <p>
                        地理院地図/Maptiler/MapBox/Bing/Google/ESRI/Mapfanを除くOpenStreetMapベースのデータは 
                        © OpenStreetMap (License: ODbL 1.0), OSMタイル CC-BY-SA 2.0
                    </p>
                    <p>
                        mapcompare.jpのソースコードは
                        <b-link href="https://opensource.org/licenses/BSD-2-Clause" target="_blank"
                            >2-Clause BSDライセンス</b-link
                        >により公開されています
                    </p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5>GitHub:</h5>
                    <p>
                        <b-link
                            href="https://github.com/mapcomparejp/JapanMapCompare"
                            target="_blank"
                            >mapcomparejp/JapanMapCompare</b-link
                        >
                    </p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">検証済みブラウザ:</h5>
                    <p>Google Chrome (最新版)</p>
                    <p>Firefox (最新版)</p>
                </b-col>
            </b-row>

            <hr/>
            <!-- english -->
            <b-row>
                <b-col cols="11" offset="1" class="mb-5 mt-3">
                    <h5 class="mb-3">Japan Map Compare: mapcompare.jp</h5>
                    <p>
                        Japan Map Compare can compare the various webmaps focusing on Japan area including 
                        OpenStreetMap, MapTiler, MapBox, Bing, Google, Apple, ESRI, Mapfan and GSI Map. 
                        It is inspired by Map Compare coded by 
                        <b-link href="https://tools.geofabrik.de/mc" target="_blank">Geofabrik</b-link> 
                        and <b-link href="https://mc.bbbike.org/mc/" target="_blank">BBBike</b-link> 
                        (Thanks a lot!!) and is developed using modern webmapping technologies like Leaflet, Vue.js…
                    </p>
                    <p>
                        You can use permalink to save the current status of showing page as below example.
                    </p>
                    <p>
                        https://mapcompare.jp/3{number of panels}/14{zoom
                        level}/35.6795{lat}/139.7672{lon}/tPale{webmap_1}/osm{webmap_2}/tOrt{webmap_3}
                    </p>
                    <p>
                        Comparison with MapBox, Bing Maps, Google Maps, Apple Maps, Mapfan is for informational 
                        purposes only. Do not use information from these webmaps to edit OpenStreetMap data.
                    </p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-4">Comparable webmaps {webmap}:</h5>
                    <b-table :items="itemsEglish"></b-table>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">developed by:</h5>
                    <p>
                        <b-link
                        href="https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-18KT0049"
                        target="_blank"
                    >
                            JSPS Scientific Research (B) (Generative Research Fields) Project: Trusts of Crowdsourced Geographic Information
                        </b-link>
                    </p>
                    <b-link
                        href="https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-18KT0049"
                        target="_blank"
                    >
                        <b-img src="../assets/trusts_of_gi.png"></b-img>
                    </b-link>
                    <p>
                        <b-link
                        href="https://speakerdeck.com/tosseto/20190921sotm2019-lt-mc"
                        target="_blank"
                    >
                            ・State of the Map 2019 Lightning Talk
                        </b-link>
                    </p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">Contact us:</h5>
                    <p>mapcomparejp[at]gmail.com</p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">Developed by:</h5>
                    <p>MIERUNE Inc.</p>
                    <b-link href="https://mierune.co.jp" target="_blank">
                        <b-img src="../assets/mierune.png"></b-img>
                    </b-link>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">License:</h5>
                    <p>
                        All maps except GSI Maps（地理院地図）/MapBox/Bing/Google/ESRI/Mapfan based on OSM data © OpenStreetMap (License: ODbL 1.0), OSM Tiles licensed CC-BY-SA 2.0
                    </p>
                    <p>
                        The source code of Japan Map Compare is licensed under The 
                        <b-link href="https://opensource.org/licenses/BSD-2-Clause" target="_blank"
                            >2-Clause BSD License</b-link
                        >
                    </p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5>GitHub:</h5>
                    <p>
                        <b-link
                            href="https://github.com/mapcomparejp/JapanMapCompare"
                            target="_blank"
                            >mapcomparejp/JapanMapCompare</b-link
                        >
                    </p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">Supported browsers:</h5>
                    <p>Google Chrome (Latest edition)</p>
                    <p>Firefox (Latest edition)</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Menu from '@/components/Menu.vue';

export default {
    name: 'Help',
    components: {
        Menu,
    },
    data() {
        return {
            items: [
                {
                    '名称': '地理院地図 淡色',
                    'レイヤ': 'tPale',
                    '概要':
                        '国土地理院による地形図',
                },
                {
                    '名称': '地理院地図 オルソ',
                    'レイヤ': 'tOrt',
                    '概要':
                        '国土地理院による衛星・航空写真',
                },
                {
                    '名称': 'MIERUNE Streets',
                    'レイヤ': 'mieStreets',
                    '概要': 'OSMデータ・基盤地図情報を利用したMapTiler.comによる道路図',
                },
                {
                    '名称': 'MIERUNE Gray',
                    'レイヤ': 'mieGray',
                    '概要': 'OSMデータ・基盤地図情報を利用したMapTiler.comによるグレースケール地図',
                },
                {
                    '名称': 'MIERUNE Dark',
                    'レイヤ': 'mieDark',
                    '概要': 'OSMデータ・基盤地図情報を利用したMapTiler.comによるダークカラー地図',
                },
                {
                    '名称': 'MIERUNE Satellite',
                    'レイヤ': 'mieSatellite',
                    '概要': 'MapTiler.comによる衛星・航空写真',
                },
                {
                    '名称': 'OpenStreetMap',
                    'レイヤ': 'osm',
                    '概要':
                        '公式タイルサーバのOpenStreetMap CartoによるレンダリングOpenStreetMap地図',
                },
                {
                    '名称': 'Mapbox Streets',
                    'レイヤ': 'mapStreets',
                    '概要': 'ゼンリンデータ（日本国内のみ）を利用したMapbox.comによる道路図',
                },
                {
                    '名称': 'Mapbox Dark',
                    'レイヤ': 'mapDark',
                    '概要': 'ゼンリンデータ（日本国内のみ）を利用したMapbox.comによるダークカラー地図',
                },
                {
                    '名称': 'Mapbox Satelite',
                    'レイヤ': 'mapSatellite',
                    '概要': 'Mapbox.comによる衛星・航空写真',
                },
                { '名称': 'ESRI', 'レイヤ': 'esri', '概要': 'Esri.comによる道路図' },
                {
                    '名称': 'Bing Maps Road',
                    'レイヤ': 'bRoad',
                    '概要': 'Bing maps street',
                },
                {
                    '名称': 'Google Maps Road',
                    'レイヤ': 'gRoad',
                    '概要': 'Google maps street',
                },
                {
                    '名称': 'Apple Maps Standerd',
                    'レイヤ': 'apmapsStandard',
                    '概要': 'Apple Mapによる道路図',
                },
                {
                    '名称': 'Apple Maps Satelite',
                    'レイヤ': 'apmapsSatelite',
                    '概要': 'Apple Mapによる衛星・航空写真',
                },
                {
                    '名称': 'Mapfan',
                    'レイヤ': 'mapfan',
                    '概要': 'Mapfan.comによる道路図',
                },
            ],
            itemsEglish: [
                {
                    'Name': '地理院地図 淡色',
                    'Layer': 'tPale',
                    'Overview':
                        'topographic map by gsi.go.jp (Geospatial Information Authority of Japan)',
                },
                {
                    'Name': '地理院地図 オルソ',
                    'Layer': 'tOrt',
                    'Overview':
                        'satellite and aerial photos by gsi.go.jp (Geospatial Information Authority of Japan)',
                },
                {
                    'Name': 'MIERUNE Streets',
                    'Layer': 'mieStreets',
                    'Overview': 'street map by MapTiler.com using OSM data and Digital Map (Basic Geospatial Information) by Geospatial Information Authority of Japan',
                },
                {
                    'Name': 'MIERUNE Gray',
                    'Layer': 'mieGray',
                    'Overview': 'gray map by MapTiler.com using OSM data and Digital Map (Basic Geospatial Information) by Geospatial Information Authority of Japan',
                },
                {
                    'Name': 'MIERUNE Dark',
                    'Layer': 'mieDark',
                    'Overview': 'dark map by MapTiler.com using OSM data and Digital Map (Basic Geospatial Information) by Geospatial Information Authority of Japan',
                },
                {
                    'Name': 'MIERUNE Satellite',
                    'Layer': 'mieSatellite',
                    'Overview': 'satellite and aerial photos by MapTiler.com',
                },
                {
                    'Name': 'OpenStreetMap',
                    'Layer': 'osm',
                    'Overview':
                        'OpenStreetMap data rendered with OpenStreetMap Carto from official tile server',
                },
                {
                    'Name': 'Mapbox Streets',
                    'Layer': 'mapStreets',
                    'Overview': 'street map by Mapbox.com using ZENRIN data(Japanese domestic only)',
                },
                {
                    'Name': 'Mapbox Dark',
                    'Layer': 'mapDark',
                    'Overview': 'dark map by Mapbox.com using ZENRIN data(Japanese domestic only)',
                },
                {
                    'Name': 'Mapbox Satelite',
                    'Layer': 'mapSatellite',
                    'Overview': 'satellite and aerial photos by Mapbox.com',
                },
                { 'Name': 'ESRI', 'Layer': 'esri', 'Overview': 'Street map by Esri.com' },
                {
                    'Name': 'Bing Maps Road',
                    'Layer': 'bRoad',
                    'Overview': 'Bing maps street',
                },
                {
                    'Name': 'Google Maps Road',
                    'Layer': 'gRoad',
                    'Overview': 'Google maps street',
                },
                {
                    'Name': 'Apple Maps Standerd',
                    'Layer': 'apmapsStandard',
                    'Overview': 'standerd map by Apple Mapkit',
                },
                {
                    'Name': 'Apple Maps Satelite',
                    'Layer': 'apmapsSatelite',
                    'Overview': 'satelite map by Apple Mapkit',
                },
                {
                    'Name': 'Mapfan',
                    'Layer': 'mapfan',
                    'Overview': 'street map by Mapfan.com',
                },
            ]
        };
    },
    beforeRouteEnter(to, from, next) {
        setTimeout(next, 2000);
    },
};
</script>

<style scoped>
.help {
    text-align: left;
}
img {
    margin-bottom: 20px;
}
</style>
