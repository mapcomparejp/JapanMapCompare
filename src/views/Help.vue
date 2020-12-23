<template>
    <div class="help">
        <!--メニュー-->
        <Menu></Menu>

        <b-container>
            <b-row>
                <b-col cols="11" offset="1" class="my-5">
                    <h3>This web site is</h3>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">Japan Map Compare: mapcompare.jp</h5>
                    <p>
                        Japan Map Compare can compare the various webmaps focusing on Japan area
                        including OpenStreetMap, Bing, Google, ESRI, Mapfan and GSI Map. It is
                        inspired by
                        <b-link href="https://tools.geofabrik.de/mc" target="_blank"
                            >Map Compare</b-link
                        >
                        coded by Geofabrik and BBBike (Thanks a lot!!) and is developed using modern
                        webmapping technologies like Leaflet, Vue.js...
                    </p>
                    <p>
                        You can use permalink to save the current status of showing page as below
                        example.
                    </p>
                    <p>
                        https://mapcompare.jp/3{number of panels}/14{zoom
                        level}/35.6795{lat}/139.7672{lon}/tPale{webmap_1}/osm{webmap_2}/tOrt{webmap_3}
                    </p>
                    <p>
                        Comparison with Bing Maps, Google Maps, Mapfan is for informational purposes
                        only. Do not use information from these webmaps to edit OpenStreetMap data.
                    </p>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-4">Comparable webmaps {webmap}:</h5>
                    <b-table :items="items"></b-table>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">developed by:</h5>
                    <p>
                        JSPS Scientific Research (B) (Generative Research Fields) Project: Trusts of
                        Crowdsourced Geographic Information
                    </p>
                    <p>mapcomparejp@gmail.com</p>
                    <b-link
                        href="https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-18KT0049"
                        target="_blank"
                    >
                        <b-img src="../assets/trusts_of_gi.png"></b-img>
                    </b-link>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">developed by:</h5>
                    <p>MIERUNE Inc.</p>
                    <b-link href="https://mierune.co.jp" target="_blank">
                        <b-img src="../assets/mierune.png"></b-img>
                    </b-link>
                </b-col>

                <b-col cols="11" offset="1" class="mb-5">
                    <h5 class="mb-3">License:</h5>
                    <p>
                        All maps except GSI Maps（地理院地図）/Bing/Google/ESRI/Mapfan based on OSM
                        data © OpenStreetMap (License: ODbL 1.0), OSM Tiles licensed CC-BY-SA 2.0
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
                    name: '地理院地図 淡色',
                    layer: 'tPale',
                    overview:
                        'topographic map by gsi.go.jp (Geospatial Information Authority of Japan)',
                },
                {
                    name: '地理院地図 オルソ',
                    layer: 'tOrt',
                    overview:
                        'satellite and aerial photos by gsi.go.jp (Geospatial Information Authority of Japan)',
                },
                {
                    name: 'MIERUNE Streets',
                    layer: 'mieStreets',
                    overview: 'street map by MapTiler.com using OSM data',
                },
                {
                    name: 'MIERUNE Gray',
                    layer: 'mieGray',
                    overview: 'gray map by MapTiler.com using OSM data',
                },
                {
                    name: 'MIERUNE Dark',
                    layer: 'mieDark',
                    overview: 'dark map by MapTiler.com using OSM data',
                },
                {
                    name: 'MIERUNE Satellite',
                    layer: 'mieSatellite',
                    overview: 'satellite and aerial photos by MapTiler.com',
                },
                {
                    name: 'OpenStreetMap',
                    layer: 'osm',
                    overview:
                        'OpenStreetMap data rendered with OpenStreetMap Carto from official tile server',
                },
                {
                    name: 'Mapbox Streets',
                    layer: 'mapStreets',
                    overview: 'street map by Mapbox.com using OSM data',
                },
                {
                    name: 'Mapbox Dark',
                    layer: 'mapDark',
                    overview: 'dark map by Mapbox.com using OSM data',
                },
                {
                    name: 'Mapbox Satelite',
                    layer: 'mapSatellite',
                    overview: 'satellite and aerial photos by Mapbox.com',
                },
                { name: 'ESRI', layer: 'esri', overview: 'Street map by Esri.com' },
                {
                    name: 'Bing Maps Road',
                    layer: 'bRoad',
                    overview: 'Bing maps street',
                },
                {
                    name: 'Google Maps Road',
                    layer: 'gRoad',
                    overview: 'Google maps street',
                },
                {
                    name: 'Mapfan',
                    layer: 'mapfan',
                    overview: 'street map by Mapfan.com',
                },
            ],
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
