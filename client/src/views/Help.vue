<template>
    <div class='help'>
        <!--メニュー-->
        <Menu></Menu>

        <b-container>
            <b-row>
                <b-col cols='11' offset='1' class='my-5'>
                    <h3>This web site is</h3>
                </b-col>

                <b-col cols='11' offset='1' class='mb-5'>
                    <h5 class='mb-3'>developed by:</h5>
                    <p>JSPS Scientific Research (B) (Generative Research Fields) Project: Trusts of Crowdsourced Geographic Information</p>
                    <p>mapcomparejp@gmail.com</p>
                    <b-link href='https://kaken.nii.ac.jp/grant/KAKENHI-PROJECT-18KT0049' target='_blank'>
                        <b-img src='../assets/trusts_of_gi.png'></b-img>
                    </b-link>
                </b-col>

                <b-col cols='11' offset='1' class='mb-5'>
                    <h5 class='mb-3'>developed by:</h5>
                    <p>MIERUNE Inc.</p>
                    <b-link href='https://mierune.co.jp' target='_blank'>
                        <b-img src='../assets/mierune.png'></b-img>
                    </b-link>
                </b-col>

                <b-col cols='11' offset='1' class='mb-5'>
                    <h5 class='mb-3'>License:</h5>
                    <p>All maps except GSI Maps（地理院地図）Bing/Google/Mapfan based on OSM data © OpenStreetMap (License: ODbL 1.0), OSM Tiles licensed CC-BY-SA 2.0</p>
                    <p>The source code of mapcompare.jp is lisensed under The <b-link href='https://opensource.org/licenses/BSD-2-Clause' target='_blank'>2-Clause BSD License</b-link></p>
                </b-col>

                <b-col cols='11' offset='1' class='mb-5'>
                    <h5>GitHub:</h5>
                    <p><b-link href='https://github.com/mapcomparejp/JapanMapCompare' target='_blank'>mapcomparejp/JapanMapCompare</b-link></p>
                </b-col>

                <b-col cols='11' offset='1' class='mb-5'>
                    <h5 class='mb-3'>Supported browsers:</h5>
                    <p>Google Chrome (Latest edition)</p>
                    <p>Firefox (Latest edition)</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Menu from '@/components/Menu.vue'

    export default {
        name: 'Help',
        components: {
            Menu
        },
        beforeRouteEnter(to, from, next) {
            setTimeout(next, 2000)
        }
    }
</script>

<style scoped>
    .help{
        text-align: left;
    }
    img {
        margin-bottom: 20px;
    }
</style>
