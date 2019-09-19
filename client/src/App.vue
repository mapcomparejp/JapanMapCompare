<template>
  <div id='app'>
    <transition name='view'>
      <router-view v-show='!loading'/>
    </transition>
    <Loading/>
  </div>
</template>

<script>
    import Loading from './components/Loading.vue';
    // 地図種類読み込み
    import mapJson from './assets/MapType.json'
    // script.jsライブラリ読み込み
    const scriptJs = require('scriptjs');

    export default {
        name: 'app',
        components: {
            Loading
        },
        created: function () {
            // GoogleMapsAPI認証
            const GoogleMapsKey = 'https://maps.googleapis.com/maps/api/js?key=' + this.getGoogleMapsKey();
            scriptJs(GoogleMapsKey);
            // MapFanAPI認証
            this.getMapFanMapsKey();
        },
        computed: {
            loading () {
                return this.$store.state.loading
            }
        },
        methods: {
            // GoogleMapsKey取得処理
            getGoogleMapsKey: function() {
                let googleMapsKey;
                for (const v of mapJson) {
                    if (v.value === 'gRoad') {
                        googleMapsKey = v.googleMapsKey;
                    }
                }
                return googleMapsKey
            },
            // MapFanMapsKey取得処理
            getMapFanMapsKey: function() {
                for (const v of mapJson) {
                    if (v.value === 'mapfan') {
                        this.$store.dispatch(
                            'getMapFanApiKeyAction',
                            v.mapFanAuthKey
                        );
                    }
                }
            },
        }
    };
</script>

<style>

  .view-enter-active {
    transition: opacity 2.0s;
  }
  /*.view-enter-active, .view-leave-active {*/
  /*transition: opacity 0.5s;*/
  /*}*/
  .view-leave-active {
    position: absolute;
  }
  .view-enter, .view-leave-to {
    opacity: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

</style>

