import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

//vue-analytics読み込み
import VueAnalytics from 'vue-analytics';
// axios読み込み
import './plugins/axios';
// bootstrap-vue読み込み
import './plugins/bootstrap-vue';
// Leaflet読み込み
import 'leaflet/dist/leaflet.css';
// Leafletプラグイン読み込み
import 'leaflet.gridlayer.googlemutant';
import 'leaflet-bing-layer';
import 'leaflet.sync';

Vue.config.productionTip = false;

// Google アナリティクス適用
Vue.use(VueAnalytics, {
    id: 'UA-57375666-12',
    router,
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
